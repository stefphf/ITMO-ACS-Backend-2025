import { AppDataSource } from "../data-source";
import { Favorite } from "../models/favorite";
import { Property } from "../models/property";
import { CreateFavoriteDto, UpdateFavoriteDto } from "../dto/favoriteDto";

const favoriteRepository = AppDataSource.getRepository(Favorite);
const propertyRepository = AppDataSource.getRepository(Property);

class FavoriteService {
    async getAllFavorites(userId: number) {
        return favoriteRepository.find({
            where: { user: { id: userId } },
            relations: ['property', 'property.owner'],
            order: { created_at: 'DESC' }
        });
    }

    async getFavoriteById(favoriteId: number, userId: number) {
        const favorite = await favoriteRepository.findOne({
            where: { id: favoriteId, user: { id: userId } },
            relations: ['property', 'property.owner']
        });
        return favorite;
    }

    async addFavorite(userId: number, dto: CreateFavoriteDto) {
        const { propertyId } = dto;
        const property = await propertyRepository.findOneBy({ id: propertyId });
        if (!property) {
            throw new Error("Property not found");
        }

        const existingFavorite = await favoriteRepository.findOne({
            where: {
                user: { id: userId },
                property: { id: propertyId }
            }
        });

        if (existingFavorite) {
            throw new Error("Property already in favorites");
        }

        const favorite = favoriteRepository.create({
            user: { id: userId },
            property: { id: propertyId }
        });

        await favoriteRepository.save(favorite);
        return favorite;
    }

    async updateFavorite(userId: number, favoriteId: number, dto: UpdateFavoriteDto) {
        const favorite = await favoriteRepository.findOne({
            where: { id: favoriteId, user: { id: userId } },
            relations: ['property']
        });

        if (!favorite) {
            throw new Error("Favorite not found");
        }

        if (dto.propertyId) {
            const property = await propertyRepository.findOneBy({ id: dto.propertyId });
            if (!property) {
                throw new Error("Property not found");
            }
            favorite.property = property;
        }

        await favoriteRepository.save(favorite);
        return favorite;
    }

    async removeFavorite(userId: number, favoriteId: number) {
        const favorite = await favoriteRepository.findOne({
            where: { id: favoriteId, user: { id: userId } }
        });

        if (!favorite) {
            throw new Error("Favorite not found");
        }

        await favoriteRepository.remove(favorite);
        return { message: "Favorite removed successfully" };
    }

    async getUserFavorites(userId: number) {
        return favoriteRepository.find({
            where: { user: { id: userId } },
            relations: ['property', 'property.owner'],
            order: { created_at: 'DESC' }
        });
    }
}

export default new FavoriteService();