import { Context } from 'telegraf';

export const getKeyboardFromContext = (ctx: Context) => {
    // @ts-ignore
    return ctx.callbackQuery.message.reply_markup.inline_keyboard;
};
