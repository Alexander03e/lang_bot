import { Context, Markup } from 'telegraf';
import { emptyKeyboard } from '@app/shared/consts/common';
import { StateService } from '@app/shared/types/state.interface';
import { IState } from '@app/core/redis/redis.interface';
import { Message, Update } from '@telegraf/types';

import Edited = Update.Edited;
import TextMessage = Message.TextMessage;

export class MessageService {
    constructor(private readonly redisService: StateService<IState>) {}

    async editMessage(ctx: Context, message: string, keyboard?: Markup.Markup<any>) {
        const tgId = ctx?.chat?.id;
        if (!tgId) return;

        const { lastMessage } = await this.redisService.getState(tgId);

        if (!lastMessage) return;

        const editedMessage = (await ctx.telegram.editMessageText(
            tgId,
            Number(lastMessage.id),
            '',
            message,
            {
                parse_mode: 'HTML',
                reply_markup: keyboard ? keyboard.reply_markup : emptyKeyboard.reply_markup,
            },
        )) as Edited & TextMessage;

        await this.redisService.setState(tgId, {
            lastMessage: {
                message: editedMessage.text,
                id: editedMessage.message_id,
                isInlineKeyboard: !!keyboard,
            },
        });
    }

    async clearKeyboard(
        ctx: Context,
        messageText: string,
        messageId?: number,
        withKeyboard?: boolean,
    ) {
        const tgId = ctx?.chat?.id;

        if (!tgId || !messageId) return;

        await ctx.telegram.editMessageText(tgId, messageId, '', messageText, {
            parse_mode: 'HTML',
            reply_markup: withKeyboard ? emptyKeyboard.reply_markup : undefined,
        });
    }

    async sendMessage(ctx: Context, message: string, keyboard?: Markup.Markup<any>) {
        const tgId = ctx?.chat?.id;
        if (!tgId) return;

        try {
            const newMessage = await ctx.telegram.sendMessage(ctx.chat.id, message, {
                parse_mode: 'HTML',
                reply_markup: keyboard
                    ? keyboard.resize().reply_markup
                    : emptyKeyboard.reply_markup,
            });

            const prevState = await this.redisService.getState(tgId);

            await this.redisService.setState(tgId, {
                lastMessage: {
                    message: newMessage.text,
                    id: newMessage.message_id,
                    isInlineKeyboard: !!keyboard,
                },
            });

            await this.clearKeyboard(
                ctx,
                prevState?.lastMessage?.message || '',
                prevState?.lastMessage?.id,
                prevState?.lastMessage?.isInlineKeyboard,
            );
        } catch (e) {}
    }
}
