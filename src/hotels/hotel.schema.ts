import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: () => new Date() })
    createdAt: Date;

    @Prop({ default: () => new Date() })
    updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
