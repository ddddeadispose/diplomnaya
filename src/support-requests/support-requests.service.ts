import { Injectable, EventEmitter } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SupportRequest, SupportRequestDocument, Message } from './support-request.schema';
import {
    CreateSupportRequestDto,
    SendMessageDto,
    MarkMessagesAsReadDto,
    GetChatListParams,
} from './support-request.interfaces';

@Injectable()
export class SupportRequestsService {
    private readonly eventEmitter: EventEmitter = new EventEmitter();

    constructor(
        @InjectModel(SupportRequest.name) private readonly supportRequestModel: Model<SupportRequestDocument>,
    ) {}

    async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
        const query: any = { isActive: params.isActive };

        if (params.user !== null) {
            query.user = params.user;
        }

        return this.supportRequestModel.find(query).exec();
    }

    async sendMessage(data: SendMessageDto): Promise<Message> {
        const supportRequest = await this.supportRequestModel.findById(data.supportRequest).exec();

        if (!supportRequest) {
            throw new Error('Support request not found.');
        }

        const message = { author: data.author, sentAt: new Date(), text: data.text };
        supportRequest.messages.push(message);
        await supportRequest.save();

        // Оповещение через EventEmitter
        this.eventEmitter.emit('message', supportRequest, message);

        return message;
    }

    async getMessages(supportRequest: string): Promise<Message[]> {
        const request = await this.supportRequestModel.findById(supportRequest).exec();

        if (!request) {
            throw new Error('Support request not found.');
        }

        return request.messages;
    }

    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        this.eventEmitter.on('message', handler);

        return () => {
            this.eventEmitter.off('message', handler);
        };
    }

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        const supportRequest = new this.supportRequestModel({ user: data.user, createdAt: new Date(), messages: [] });
        return supportRequest.save();
    }

    async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        const supportRequest = await this.supportRequestModel.findById(params.supportRequest).exec();

        if (!supportRequest) {
            throw new Error('Support request not found.');
        }

        for (const message of supportRequest.messages) {
            if (message.author !== params.user && !message.readAt) {
                message.readAt = new Date();
            }
        }

        await supportRequest.save();
    }

    async getUnreadCount(supportRequest: string): Promise<number> {
        const request = await this.supportRequestModel.findById(supportRequest).exec();

        if (!request) {
            throw new Error('Support request not found.');
        }

        return request.messages.filter((message) => !message.readAt).length;
    }
}
