import { ID } from 'mongoose';

export interface SearchHotelParams {
    limit: number;
    offset: number;
    title: string;
}

export interface UpdateHotelParams {
    title: string;
    description: string;
}

export interface SearchRoomsParams {
    limit: number;
    offset: number;
    hotel: ID;
    isEnabled?: boolean;
}
