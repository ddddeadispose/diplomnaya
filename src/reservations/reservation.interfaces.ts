import { ID } from 'mongoose';

export interface ReservationDto {
    userId: ID;
    hotelId: ID;
    roomId: ID;
    dateStart: Date;
    dateEnd: Date;
}

export interface ReservationSearchOptions {
    userId: ID;
    dateStart: Date;
    dateEnd: Date;
}
