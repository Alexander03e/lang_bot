import { Markup } from 'telegraf';
import { LANGUAGE } from '@app/shared/consts/language';
import { ELangueage } from '@app/shared/enums/entities.enum';

export const StartCommandKeyboard: Markup.Markup<any> = Markup.inlineKeyboard([
    [Markup.button.callback(LANGUAGE[ELangueage.EN].translate, LANGUAGE[ELangueage.EN].action)],
    [Markup.button.callback(LANGUAGE[ELangueage.GE].translate, LANGUAGE[ELangueage.GE].action)],
]);
