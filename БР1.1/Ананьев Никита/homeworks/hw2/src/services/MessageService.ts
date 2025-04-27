import { MessageDto } from "../dtos/MessageDtos"
import { Message } from "../models/MessageModel"
import { MessageMapper } from "../mappers/MessageMapper"
import { BaseService } from "./BaseService"
import { Repository } from "typeorm"


export interface IMessageService {
    send(messageData: MessageDto): Promise<void>
}


export class MessageService extends BaseService<Message, MessageDto> implements IMessageService {
    constructor(protected readonly repository: Repository<Message>) {
        super(repository);
    }

    protected toDto(model: Message): MessageDto {
        return MessageMapper.toDto(model)
    }

    async send(messageData: MessageDto): Promise<void> {
        const message: Message = MessageMapper.toModel(messageData)
        try {
            await this.repository.save(message)
            // TODO: implement notifier
        } catch (error: any) {
            console.log(error)
        }
    }
}
