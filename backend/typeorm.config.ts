import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './src/core/user/user.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    migrations: ['migrations/**/*{.ts,.js}'],
    synchronize: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
});

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch(err => {
        console.error('Error during Data Source initialization', err);
    });

export default dataSource;
