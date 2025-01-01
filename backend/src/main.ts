import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
    const port = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.listen(port).then(() => console.log(`Server started on ${port}`));
}

bootstrap();
