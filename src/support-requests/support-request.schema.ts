import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
    @Prop({ type: String, required: true, unique: true })
    user: string;

    @Prop({ type: Date, required: true })
    createdAt: Date;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: [{ type: Object, _id: false }] })
    messages: Message[];
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);

@Schema()
export class Message {
    @Prop({ type: String, required: true })
    author: string;

    @Prop({ type: Date, required: true })
    sentAt: Date;

    @Prop({ type: String, required: true })
    text: string;

    @Prop({ type: Date })
    readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
