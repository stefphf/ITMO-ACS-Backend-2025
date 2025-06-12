import { Express } from 'express';
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';

export function useSwagger(
    app: Express,
    options: RoutingControllersOptions,
): Express {
    // Получаем метаданные валидации
    const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
    // Преобразуем метаданные в схемы JSON Schema
    const schemas = validationMetadatasToSchemas(metadatas);
    
    // Добавляем явные ссылки на вложенные схемы
    if (schemas.FreeTrainingDto && schemas.WeaponTypeDto) {
        schemas.FreeTrainingDto.properties.weaponType = { $ref: '#/components/schemas/WeaponTypeDto' };
    }
    if (schemas.FreeTrainingDto && schemas.TargetDto) {
        schemas.FreeTrainingDto.properties.target = { $ref: '#/components/schemas/TargetDto' };
    }
    if (schemas.FreeTrainingDto && schemas.SeriesDto) {
        schemas.FreeTrainingDto.properties.series = { 
            type: 'array',
            items: { $ref: '#/components/schemas/SeriesDto' }
        };
    }
    if (schemas.FreeTrainingDto && schemas.NoteDto) {
        schemas.FreeTrainingDto.properties.notes = { 
            type: 'array',
            items: { $ref: '#/components/schemas/NoteDto' }
        };
    }
    if (schemas.QualificationTrainingDto && schemas.ExerciseDto) {
        schemas.QualificationTrainingDto.properties.exercise = { $ref: '#/components/schemas/ExerciseDto' };
    }
    if (schemas.SeriesDto && schemas.ShotDto) {
        schemas.SeriesDto.properties.shots = { 
            type: 'array',
            items: { $ref: '#/components/schemas/ShotDto' }
        };
    }
    if (schemas.ExerciseDto && schemas.TargetDto) {
        schemas.ExerciseDto.properties.target = { $ref: '#/components/schemas/TargetDto' };
    }
    if (schemas.ExerciseDto && schemas.WeaponTypeDto) {
        schemas.ExerciseDto.properties.weapon_type = { $ref: '#/components/schemas/WeaponTypeDto' };
    }
    
    // Добавляем схемы для аутентификации
    if (!schemas.RegisterResponseDto) {
        schemas.RegisterResponseDto = {
            type: 'object',
            properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                email: { type: 'string' },
                accessToken: { type: 'string' }
            }
        };
    }
    
    if (!schemas.ErrorResponseDto) {
        schemas.ErrorResponseDto = {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        };
    }
    
    if (!schemas.SuccessResponseDto) {
        schemas.SuccessResponseDto = {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        };
    }
    
    if (!schemas.LoginResponseDto) {
        schemas.LoginResponseDto = {
            type: 'object',
            properties: {
                accessToken: { type: 'string' }
            }
        };
    }
    
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, options, {
        info: {
            title: 'Range Rookies API',
            version: '1.0.0',
            description: 'Автоматическая документация API',
        },
        components: {
            schemas: schemas as any,
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Введите JWT токен в формате: Bearer {token}'
                }
            }
        },
        security: [
            { bearerAuth: [] }
        ]
    });

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
    app.get('/swagger.json', (_req, res) => res.json(spec));
    return app;
}
