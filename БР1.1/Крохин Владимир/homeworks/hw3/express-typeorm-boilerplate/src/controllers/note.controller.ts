import { Get, Post, Patch, Param, Body, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import EntityController from '../common/entity-controller';
import { NoteEntity } from '../models/note.entity';
import authMiddleware from '../middlewares/auth.middleware';
import { NoteDto, CreateNoteDto, UpdateNoteDto } from '../dtos/note.dto';

@EntityController({
    baseRoute: '/notes',
    entity: NoteEntity,
})
export default class NoteController {
    repository;

    @Get('/')
    @OpenAPI({ summary: 'Получить все заметки' })
    @ResponseSchema(NoteDto, { isArray: true })
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать заметку' })
    @ResponseSchema(NoteDto)
    async create(@Body() dto: CreateNoteDto) {
        const note = new NoteEntity();
        note.user_id = dto.userId;
        note.content = dto.content;
        // created_at и другие поля могут быть заданы автоматически
        const created = this.repository.create(note);
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Получить заметку по id' })
    @ResponseSchema(NoteDto)
    async getById(@Param('id') id: number) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Заметка не найдена' };
        }
        return entity;
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Обновить заметку' })
    @ResponseSchema(NoteDto)
    async update(@Param('id') id: number, @Body() dto: UpdateNoteDto) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Заметка не найдена' };
        }
        if (dto.content !== undefined) entity.content = dto.content;
        // edited_at можно обновлять автоматически
        return this.repository.save(entity);
    }
}
