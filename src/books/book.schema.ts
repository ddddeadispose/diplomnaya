// src/books/book.schema.ts
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Book {
    @Prop({ required: true })
    public title: string;

    @Prop({ required: true })
    public author: string;

    @Prop()
    public description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDocument = Book & Document;
