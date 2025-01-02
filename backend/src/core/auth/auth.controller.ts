import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as process from 'node:process';

@Controller('auth')
export class AuthController {
    @Post()
    async login(@Body() data: { username: string; password: string }) {
        const { username, password } = data || {};

        if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
            return {
                token: sign({ username, password }, process.env.JWT_SECRET),
            };
        } else {
            throw new UnauthorizedException('Неверные данные');
        }
    }
}
