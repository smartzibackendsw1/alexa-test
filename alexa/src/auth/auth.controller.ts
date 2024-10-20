// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('protected')
    getProtected(@Request() req) {
        return { message: 'You are authenticated', user: req.user };
    }
}
