import {dataSource} from "../config/dataSource";
import {User} from "../models/User";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutPlanUserLink} from "../models/WorkoutPlanUserLink";
import {Body, Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {RegistrationDto} from "../dto/userDto";
import bcrypt from "bcrypt";

const userRepo = dataSource.getRepository(User);
const workoutPlanUserLinkRepo = dataSource.getRepository(WorkoutPlanUserLink);

@JsonController('/user')
export class UserController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const users = await userRepo.find();
        return res.json({users});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const user = await userRepo.findOne({ where: { id: +req.params.id } });
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        return res.json({user});
    }

    @OpenAPI({})
    @Put('/')
    async update(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const user = await userRepo.findOne({ where: { id: +req.params.id } });
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
        await userRepo.save(user);
        return res.json({user});
    }

    @OpenAPI({})
    @Delete('/')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const user = await userRepo.findOne({ where: { id: +req.user.id } });
        if (!user) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await userRepo.remove(user);
        return res.json({ message: 'User deleted successfully' });
    }

    @OpenAPI({})
    @Get('/get-workout-plans/:userId')
    async getWorkoutPlans(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const userId = parseInt(req.params.userId);
        const links = await workoutPlanUserLinkRepo.find({ where: { userId }, relations: ['workoutPlan'] });
        const workoutPlans = links.map(link => link.workoutPlan);
        return res.json({workoutPlans});
    }

    @OpenAPI({})
    @Post('/add-workout-plans')
    async addWorkoutPlan(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const { workoutPlanId, planedAt } = req.body;
        const userId = +req.user.id
        const link = workoutPlanUserLinkRepo.create({userId, workoutPlanId, planedAt});
        link.userId = userId;
        link.workoutPlanId = workoutPlanId;
        link.planedAt = new Date(planedAt);
        const savedLink = await workoutPlanUserLinkRepo.save(link);
        return res.json({savedLink});
    }

    @OpenAPI({})
    @Delete('/remove-workout-plans/:workoutPlanId')
    async removeWorkoutPlan(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if(!req.user) throw ApiError.forbidden()
        const workoutPlanId = parseInt(req.params.workoutPlanId);
        const workoutPlanUserLink = await workoutPlanUserLinkRepo.find({where: {workoutPlanId, userId: +req.user.id}});
        if (!workoutPlanUserLink) {
            throw ApiError.badRequest(errorMessages.workoutPlanNotFound)
        }
        return res.json({ message: 'Deleted successfully' });
    }
}

