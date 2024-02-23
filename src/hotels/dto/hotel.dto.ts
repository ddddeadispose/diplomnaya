export class HotelDto {
    title: string;
    description: string;
}

export class HotelUpdateDto {
    title: string;
    description: string;
}

export class HotelRoomDto {
    description: string;
    hotelId: string;
}

export class HotelRoomUpdateDto {
    description: string;
    hotelId: string;
    isEnabled: boolean;
}
