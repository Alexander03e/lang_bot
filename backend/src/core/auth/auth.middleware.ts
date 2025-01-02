import { HttpException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            throw new UnauthorizedException('Токен не найден');
        }

        const token = req.headers.authorization.split(' ')[1];

        try {
            verify(token, process.env.JWT_SECRET);
            next();
        } catch (e) {
            throw new HttpException('Неверный токен', 403);
        }
    }
}
