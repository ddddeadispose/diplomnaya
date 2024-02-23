import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HotelRoomDocument = HotelRoom & Document;

@Schema()
export class HotelRoom {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
    hotel: MongooseSchema.Types.ObjectId;

    @Prop()
    description: string;

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop({ default: () => new Date() })
    createdAt: Date;

    @Prop({ default: () => new Date() })
    updatedAt: Date;

    @Prop({ default: true })
    isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
