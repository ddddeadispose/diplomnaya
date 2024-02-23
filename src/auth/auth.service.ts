// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async registerClient(data: any): Promise<User> {
        return this.usersService.createClient(data);
    }

    login(user: User) {
        return { id: user.id, email: user.email, name: user.name };
    }
}
