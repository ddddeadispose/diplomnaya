// reservation.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    hotelRoom: string;

    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true })
    endDate: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
