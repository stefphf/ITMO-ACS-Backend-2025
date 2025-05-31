import {dataSource} from "../config/dataSource";
import {BlogPost} from "../models/BlogPost";
import {Request, Response} from "express";
import {ApiError} from "../error/ApiError";
import {errorMessages} from "../error/errorMessages";
import {OpenAPI} from "routing-controllers-openapi";
import {Delete, Get, JsonController, Post, Put, Req, Res} from "routing-controllers";

const blogPostRepo = dataSource.getRepository(BlogPost);

@JsonController('/blog-post')
class BlogPostController {
    @OpenAPI({})
    @Get('/get-all')
    async getAll(
        @Res() res: Response,
    ) {
        const posts = await blogPostRepo.find();
        return res.json({posts});
    }

    @OpenAPI({})
    @Get('/get-one/:id')
    async getOne(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
        if (!post) {
            throw ApiError.badRequest(errorMessages.postNotFound)
        }
        return res.json({post});
    }

    @OpenAPI({})
    @Post('/')
    async create(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { title, content, authorId } = req.body;
        const newPost = blogPostRepo.create({ title, content, authorId });
        await blogPostRepo.save(newPost);
        return res.json({post: newPost});
    }

    @OpenAPI({})
    @Put('/:id')
    async update(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
        if (!post) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        post.title = title;
        post.content = content;
        await blogPostRepo.save(post);
        return res.json({post});
    }

    @OpenAPI({})
    @Delete('/:id')
    async delete(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const { id } = req.params;
        const post = await blogPostRepo.findOne({ where: { id: Number(id) } });
        if (!post) {
            throw ApiError.badRequest(errorMessages.userNotFound)
        }
        await blogPostRepo.remove(post);
        return res.json({ message: 'Deleted successfully' });
    }
}

