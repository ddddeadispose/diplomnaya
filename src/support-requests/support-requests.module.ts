import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequestsController } from './support-requests.controller';
import { SupportRequestsService } from './support-requests.service';
import { SupportRequest, SupportRequestSchema, Message, MessageSchema } from './support-request.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SupportRequest.name, schema: SupportRequestSchema },
            { name: Message.name, schema: MessageSchema },
        ]),
    ],
    controllers: [SupportRequestsController],
    providers: [SupportRequestsService],
})
export class SupportRequestsModule {}
