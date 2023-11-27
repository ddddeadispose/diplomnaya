// src/books/books.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.schema';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async getBooks(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @Get(':id')
    async getBook(@Param('id') id: string): Promise<Book | null> {
        return this.booksService.getBook(id);
    }

    @Post()
    async createBook(@Body() book: Book): Promise<void> {
        return this.booksService.createBook(book);
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() updatedBook: Book): Promise<void> {
        return this.booksService.updateBook(id, updatedBook);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<void> {
        return this.booksService.deleteBook(id);
    }
}
