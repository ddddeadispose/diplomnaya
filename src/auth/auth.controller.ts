// src/auth/auth.controller.ts

import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roles } from './roles/roles.decorator';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('logout')
    async logout(@Request() req: any) {
        req.logout();
    }

    @Roles('client')
    @Post('client/register')
    async registerClient(@Request() req: any) {
        return this.authService.registerClient(req.body);
    }
}
