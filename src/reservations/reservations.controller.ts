// reservations.controller.ts

import { Controller, Post, Get, Delete, Param, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('api')
export class ReservationsController {
    constructor(private readonly reservationService: ReservationService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('client')
    @Post('client/reservations')
    async reserveRoom(@Req() req, @Body() reservationData: any) {
        try {
            const userId = req.user.id;
            return await this.reservationService.reserveRoom(userId, reservationData);
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('client')
    @Get('client/reservations')
    getClientReservations(@Req() req) {
        const userId = req.user.id;
        return this.reservationService.getClientReservations(userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('client')
    @Delete('client/reservations/:id')
    cancelReservation(@Req() req, @Param('id') reservationId: string) {
        const userId = req.user.id;
        return this.reservationService.cancelReservation(userId, reservationId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('manager')
    @Get('manager/reservations/:userId')
    getManagerReservations(@Param('userId') userId: string) {
        return this.reservationService.getManagerReservations(userId);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('manager')
    @Delete('manager/reservations/:id')
    cancelManagerReservation(@Param('id') reservationId: string) {
        return this.reservationService.cancelManagerReservation(reservationId);
    }
}
