import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { Hotel, HotelSchema } from './hotel.schema';
import { HotelRoom, HotelRoomSchema } from './hotel-room.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Hotel.name, schema: HotelSchema },
            { name: HotelRoom.name, schema: HotelRoomSchema },
        ]),
    ],
    controllers: [HotelController],
    providers: [HotelService],
})
export class HotelsModule {}
