import {dataSource} from "../config/dataSource";
import {Request, RequestHandler, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {WorkoutPlan} from "../models/WorkoutPlan";
import {Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";

const workoutPlanRepo = dataSource.getRepository(WorkoutPlan);

@JsonController('/workout-plan')
class WorkoutPlanController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const workoutPlans = await workoutPlanRepo.find();
        return res.json({workoutPlans});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
        if (!workoutPlan) {
            throw ApiError.badRequest(errorMessages.exerciseTypeNotFound)
        }
        return res.json({workoutPlan});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { title, description, content, type, level, duration, videoUrl, userId } = req.body;
        const newWorkoutPlan = workoutPlanRepo.create({ title, description, content, type, level, duration, videoUrl, userId });
        await workoutPlanRepo.save(newWorkoutPlan);
        return res.json({workoutPlan: newWorkoutPlan});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
        if (!workoutPlan) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        const updatedWorkoutPlan = workoutPlanRepo.merge(workoutPlan, req.body);
        await workoutPlanRepo.save(updatedWorkoutPlan);
        return res.json({workoutPlan: updatedWorkoutPlan});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const workoutPlan = await workoutPlanRepo.findOne({ where: { id: Number(id) } });
        if (!workoutPlan) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await workoutPlanRepo.remove(workoutPlan);
        return res.json({ message: 'Deleted successfully' });
    }
}

