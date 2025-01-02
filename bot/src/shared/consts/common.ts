import { Markup } from 'telegraf';
import { LangCommandKeyboard, StartCommandKeyboard } from '@app/shared/keyboards';

export const emptyKeyboard = Markup.inlineKeyboard([]);

export const StartCommandMenu = {
    message: 'Добро пожаловать в бота.',
    keyboard: StartCommandKeyboard,
};

export const LangCommandMenu = {
    message: 'Выберите язык, который хотите учить',
    keyborad: LangCommandKeyboard,
};
