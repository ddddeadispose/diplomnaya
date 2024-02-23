import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './hotel.schema';
import { HotelRoom, HotelRoomDocument } from './hotel-room.schema';
import { SearchHotelParams, UpdateHotelParams, SearchRoomsParams } from './hotel.interfaces';
import { HotelDto, HotelUpdateDto, HotelRoomDto, HotelRoomUpdateDto } from './dto/hotel.dto';
import { FilesService } from '../../files/files.service';

@Injectable()
export class HotelService {
    constructor(
        @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,
        @InjectModel(HotelRoom.name) private readonly hotelRoomModel: Model<HotelRoomDocument>,
        private readonly filesService: FilesService, // Добавлен FilesService
    ) {}

    async createHotel(data: HotelDto): Promise<Hotel> {
        const hotel = new this.hotelModel(data);
        return await hotel.save();
    }

    async findHotelById(id: string): Promise<Hotel> {
        return this.hotelModel.findById(id).exec();
    }

    async searchHotels(params: SearchHotelParams): Promise<Hotel[]> {
        return this.hotelModel.find({ title: { $regex: new RegExp(params.title, 'i') } })
            .limit(params.limit)
            .skip(params.offset)
            .exec();
    }

    async updateHotel(id: string, data: HotelUpdateDto): Promise<Hotel> {
        return this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async createHotelRoom(data: HotelRoomDto, files: Express.Multer.File[]): Promise<HotelRoom> {
        const images = await this.filesService.saveFiles(files);
        const hotelRoom = new this.hotelRoomModel({ ...data, images });
        return await hotelRoom.save();
    }

    async findHotelRoomById(id: string): Promise<HotelRoom> {
        return this.hotelRoomModel.findById(id).exec();
    }

    async searchHotelRooms(params: SearchRoomsParams): Promise<HotelRoom[]> {
        const query: any = { hotel: params.hotel };

        if (params.isEnabled !== undefined) {
            query.isEnabled = params.isEnabled;
        }

        return this.hotelRoomModel.find(query)
            .limit(params.limit)
            .skip(params.offset)
            .exec();
    }

    async updateHotelRoom(id: string, data: HotelRoomUpdateDto, files: Express.Multer.File[]): Promise<HotelRoom> {
        if (files && files.length > 0) {
            data.images = await this.filesService.saveFiles(files);
        }

        return this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
}
