import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
    private books = [];

    createBook(book: Record<string, any>): Promise<void> {
        this.books.push(book);
        return Promise.resolve();
    }

    getBook(id: string): Promise<Record<string, any> | null> {
        const foundBook = this.books.find(book => book.id === id);
        return Promise.resolve(foundBook || null);
    }

    getBooks(): Promise<Record<string, any>[]> {
        return Promise.resolve(this.books);
    }

    updateBook(id: string, updatedBook: Record<string, any>): Promise<void> {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = updatedBook;
        }
        return Promise.resolve();
    }

    deleteBook(id: string): Promise<void> {
        this.books = this.books.filter(book => book.id !== id);
        return Promise.resolve();
    }
}
