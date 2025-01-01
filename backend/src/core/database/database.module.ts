import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                database: configService.get('DB_NAME'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
