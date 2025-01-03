require('module-alias/register');

import { MessageService } from '@app/core/message/message.service';
import { ApiService } from '@app/core/api/api.service';
import { RedisService } from '@app/core/redis/redis.service';

import { Bot } from '@app/core/bot';
import * as dotenv from 'dotenv';

dotenv.config();

const bootstrap = async () => {
    const redisService = RedisService.getInstance();
    const apiService = ApiService.getInstance();
    const messageService = new MessageService(redisService);

    const bot = new Bot(process.env.BOT_TOKEN as string, redisService, apiService, messageService);

    await bot.launch();
};

bootstrap();
