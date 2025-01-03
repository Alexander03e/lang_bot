import { Context, Markup } from 'telegraf';

type Props = {
    label: string;
    action: string;
};

export const generateKeyboard = (ctx: Context, items: Props[], otherButtons?: any[]) => {
    const buttons = items.map(item => [Markup.button.callback(item.label, item.action)]);
    if (otherButtons && ctx?.callbackQuery) {
        buttons.push(otherButtons);
    }

    return Markup.inlineKeyboard([...buttons]);
};
