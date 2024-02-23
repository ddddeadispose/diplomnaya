// reservation.service.ts

import { Injectable } from '@nestjs/common';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.schema';
import { ReservationModel } from './reservation.model';

@Injectable()
export class ReservationService {
    constructor(private readonly reservationModel: ReservationModel) {}

    async reserveRoom(userId: string, reservationData: ReservationDto): Promise<Reservation> {
        return this.reservationModel.reserveRoom(userId, reservationData);
    }

    async getClientReservations(userId: string): Promise<Reservation[]> {
        return this.reservationModel.getClientReservations(userId);
    }

    async cancelReservation(userId: string, reservationId: string): Promise<void> {
        return this.reservationModel.cancelReservation(userId, reservationId);
    }

    async getManagerReservations(managerUserId: string): Promise<Reservation[]> {
        return this.reservationModel.getManagerReservations(managerUserId);
    }

    async cancelManagerReservation(reservationId: string): Promise<void> {
        return this.reservationModel.cancelManagerReservation(reservationId);
    }
}
