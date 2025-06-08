import {dataSource} from "../config/dataSource";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutSession} from "../models/WorkoutSession";
import {Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";

const workoutSessionRepo = dataSource.getRepository(WorkoutSession);

@JsonController('/workout-session')
class WorkoutSessionController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const sessions = await workoutSessionRepo.find();
        return res.json({sessions});
    }


    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const session = await workoutSessionRepo.findOne({ where: { id: +id } });
        if (!session) {
            throw ApiError.badRequest(errorMessages.exerciseTypeNotFound)
        }
        return res.json({session});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { title, description, type, startedAt, endedAt, userId } = req.body;
        const newSession = workoutSessionRepo.create({ title, description, type, startedAt, endedAt, userId });
        await workoutSessionRepo.save(newSession);
        return res.json({session: newSession});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const { title, description, type, startedAt, endedAt, userId } = req.body;
        const session = await workoutSessionRepo.findOne({ where: { id: +id } });
        if (!session) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        workoutSessionRepo.merge(session, { title, description, type, startedAt, endedAt, userId });
        await workoutSessionRepo.save(session);
        return res.json({session});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const session = await workoutSessionRepo.findOne({ where: { id: +id } });
        if (!session) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await workoutSessionRepo.remove(session);
        return res.json({ message: 'Deleted successfully' });
    }
}
