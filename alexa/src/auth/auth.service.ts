// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = { username: 'test', password: await bcrypt.hash('password', 10) }; // Simulated user

        // Validate user
        if (username === user.username && await bcrypt.compare(password, user.password)) {
            return { userId: 1, username: user.username };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
