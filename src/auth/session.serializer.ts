// src/auth/session.serializer.ts

import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: (err: Error, payload: any) => void): Promise<any> {
        try {
            const user = await this.usersService.findById(userId);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}
