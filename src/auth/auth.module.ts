// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';

@Module({
    imports: [
        PassportModule.register({ session: true }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AuthModule {}
