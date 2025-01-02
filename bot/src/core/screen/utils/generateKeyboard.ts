import { Markup } from 'telegraf';

type Props = {
    label: string;
    action: string;
};

export const generateKeyboard = (items: Props[]) => {
    const buttons = items.map(item => [Markup.button.callback(item.label, item.action)]);
    return Markup.inlineKeyboard([...buttons]);
};
