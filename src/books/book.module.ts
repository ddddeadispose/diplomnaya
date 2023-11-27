import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {Book, BookSchema, Document} from './book.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
                { name: Book.title, schema: BookSchema }
            ]
        )
    ],
    controllers: [BooksController],
    providers: [BooksService],
    exports: [BooksService],
})
export class BookModule {}