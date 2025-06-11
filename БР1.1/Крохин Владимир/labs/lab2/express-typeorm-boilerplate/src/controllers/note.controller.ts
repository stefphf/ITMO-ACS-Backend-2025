import { Get, Post, Patch, Param, Body, UseBefore } from 'routing-controllers';
import EntityController from '../common/entity-controller';
import { NoteEntity } from '../models/note.entity';
import authMiddleware from '../middlewares/auth.middleware';

@EntityController({
    baseRoute: '/notes',
    entity: NoteEntity,
})
export default class NoteController {
    repository;

    @Get('/')
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    async create(@Body() note: Partial<NoteEntity>) {
        const created = this.repository.create(note);
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    async getById(@Param('id') id: number) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Заметка не найдена' };
        }
        return entity;
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    async update(@Param('id') id: number, @Body() note: Partial<NoteEntity>) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Заметка не найдена' };
        }
        Object.assign(entity, note);
        return this.repository.save(entity);
    }
}
