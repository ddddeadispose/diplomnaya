// src/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Book, BookDocument } from './book.schema';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private readonly bookModel: Model<BookDocument>) {}

    async getBooks(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async getBook(id: string): Promise<Book | null> {
        return this.bookModel.findById(id).exec();
    }

    async createBook(book: Book): Promise<void> {
        const createdBook = new this.bookModel(book);
        await createdBook.save();
    }

    async updateBook(id: string, updatedBook: Book): Promise<void> {
        await this.bookModel.findByIdAndUpdate(id, updatedBook).exec();
    }

    async deleteBook(id: string): Promise<void> {
        await this.bookModel.findByIdAndDelete(id).exec();
    }
}
