import { Context, Markup } from 'telegraf';

export interface BotIntance {
    sendMessage: (ctx: Context, message: string, keyboard?: Markup.Markup<any>) => Promise<void>
    editMessage: (ctx: Context, message: string, keyboard?: Markup.Markup<any>) => Promise<void>
    clearKeyboard: (ctx: Context) => Promise<void>

    launch: () => Promise<void>
}
