// reservation.model.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import { ReservationDto } from './reservation.dto';

@Injectable()
export class ReservationModel {
    constructor(
        @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>,
    ) {}

    async reserveRoom(userId: string, reservationData: ReservationDto): Promise<Reservation> {
        const reservation = new this.reservationModel({ userId, ...reservationData });
        return reservation.save();
    }

    async getClientReservations(userId: string): Promise<Reservation[]> {
        return this.reservationModel.find({ userId }).exec();
    }

    async cancelReservation(userId: string, reservationId: string): Promise<void> {
        await this.reservationModel.deleteOne({ _id: reservationId, userId }).exec();
    }

    async getManagerReservations(managerUserId: string): Promise<Reservation[]> {
        const managerReservations = await this.reservationModel.find({ userId: managerUserId }).exec();
        return managerReservations;
    }

    async cancelManagerReservation(reservationId: string): Promise<void> {
        const reservation = await this.reservationModel.findById(reservationId).exec();
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        await reservation.remove();
    }
}
