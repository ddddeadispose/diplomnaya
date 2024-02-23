import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { SupportRequestsService } from './support-requests.service';
import {
    CreateSupportRequestDto,
    SendMessageDto,
    MarkMessagesAsReadDto,
    GetChatListParams,
} from './support-request.interfaces';

@Controller('support-requests')
export class SupportRequestsController {
    constructor(private readonly supportRequestsService: SupportRequestsService) {}

    @Get()
    async findSupportRequests(@Query() params: GetChatListParams): Promise<any> {
        return this.supportRequestsService.findSupportRequests(params);
    }

    @Post()
    async createSupportRequest(@Body() data: CreateSupportRequestDto): Promise<any> {
        return this.supportRequestsService.createSupportRequest(data);
    }

    @Post(':id/messages')
    async sendMessage(@Param('id') supportRequest: string, @Body() data: SendMessageDto): Promise<any> {
        return this.supportRequestsService.sendMessage({ ...data, supportRequest });
    }

    @Get(':id/messages')
    async getMessages(@Param('id') supportRequest: string): Promise<any> {
        return this.supportRequestsService.getMessages(supportRequest);
    }

    @Post(':id/mark-read')
    async markMessagesAsRead(@Param('id') supportRequest: string, @Body() data: MarkMessagesAsReadDto): Promise<any> {
        return this.supportRequestsService.markMessagesAsRead({ ...data, supportRequest });
    }

    @Get(':id/unread-count')
    async getUnreadCount(@Param('id') supportRequest: string): Promise<any> {
        return this.supportRequestsService.getUnreadCount(supportRequest);
    }
}
