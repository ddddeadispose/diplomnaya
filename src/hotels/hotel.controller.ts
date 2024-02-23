import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { HotelDto, HotelUpdateDto, HotelRoomDto, HotelRoomUpdateDto } from '../dto/hotel.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class HotelsController {
    constructor(private readonly hotelsService: HotelService) {}

    @Get('common/hotel-rooms')
    async getHotelRooms(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('hotel') hotelId: string,
    ) {
        return this.hotelsService.getHotelRooms(limit, offset, hotelId);
    }

    @Get('common/hotel-rooms/:id')
    async getHotelRoom(@Param('id') roomId: string) {
        return this.hotelsService.getHotelRoom(roomId);
    }

    @Post('admin/hotels')
    @UseGuards(AuthGuard(), AdminGuard)
    async addHotel(@Body() hotelDto: HotelDto) {
        return this.hotelsService.addHotel(hotelDto);
    }

    @Get('admin/hotels')
    @UseGuards(AuthGuard(), AdminGuard)
    async getHotels(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('title') title: string,
    ) {
        return this.hotelsService.getHotels(limit, offset, title);
    }

    @Put('admin/hotels/:id')
    @UseGuards(AuthGuard(), AdminGuard)
    async updateHotel(@Param('id') hotelId: string, @Body() hotelUpdateDto: HotelUpdateDto) {
        return this.hotelsService.updateHotel(hotelId, hotelUpdateDto);
    }

    @Post('admin/hotel-rooms')
    @UseGuards(AuthGuard(), AdminGuard)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
    async addHotelRoom(
        @Body() hotelRoomDto: HotelRoomDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.hotelsService.addHotelRoom(hotelRoomDto, files);
    }

    @Put('admin/hotel-rooms/:id')
    @UseGuards(AuthGuard(), AdminGuard)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
    async updateHotelRoom(
        @Param('id') roomId: string,
        @Body() hotelRoomUpdateDto: HotelRoomUpdateDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.hotelsService.updateHotelRoom(roomId, hotelRoomUpdateDto, files);
    }
}
