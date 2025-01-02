import { Markup } from 'telegraf';
import { StartCommandKeyboard } from '@app/shared/keyboards';

export const emptyKeyboard = Markup.inlineKeyboard([]);

export const StartCommandMenu = {
    message: 'Добро пожаловать в бота.',
    keyboard: StartCommandKeyboard,
};
