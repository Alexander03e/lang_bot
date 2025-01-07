import { Markup } from 'telegraf';
import { LANGUAGE } from '@app/shared/consts/language';
import { ELangueage } from '@app/shared/enums/entities.enum';
import { TRANSLATION } from '@app/shared/translation';
import { EBotLang, EScreen } from '@app/shared/enums/screens.enum';
import { EBotActions } from '@app/shared/enums/actions.enum';

const emptyButton = Markup.button.callback(' ', `action.${EBotActions.EMPTY}`);

export const StartCommandKeyboard: Markup.Markup<any> = Markup.inlineKeyboard([
    [Markup.button.callback(LANGUAGE[ELangueage.EN].translate, LANGUAGE[ELangueage.EN].action)],
    [Markup.button.callback(LANGUAGE[ELangueage.GE].translate, LANGUAGE[ELangueage.GE].action)],
]);

export const LangCommandKeyboard: Markup.Markup<any> = Markup.inlineKeyboard([
    [Markup.button.callback(LANGUAGE[ELangueage.EN].translate, LANGUAGE[ELangueage.EN].action)],
    [Markup.button.callback(LANGUAGE[ELangueage.GE].translate, LANGUAGE[ELangueage.GE].action)],
]);

export const getBackButton = (lang: EBotLang) => [
    Markup.button.callback(TRANSLATION.backButton[lang], `action.${EBotActions.BACK}`),
];

export const getMenuButtons = (lang: EBotLang) =>
    Markup.inlineKeyboard([
        [Markup.button.callback(TRANSLATION.words[lang], `action.${EBotActions.WORDS}`)],
        [Markup.button.callback(TRANSLATION.createWord[lang], `action.${EBotActions.CREATE_WORD}`)],
        [Markup.button.callback(TRANSLATION.dialog[lang], `action.${EBotActions.DIALOGUE}`)],
        [
            Markup.button.callback(
                TRANSLATION.changeLang[lang],
                `action.${EBotActions.GO_TO_SELECT_LANG}`,
            ),
        ],
    ]);

export const getPaginationButton = ({
    lang = EBotLang.RU,
    current,
    total,
    prefix,
}: {
    lang: EBotLang;
    current: number;
    total: number;
    prefix?: EScreen;
}) => {
    let buttons = [
        Markup.button.callback(
            `◀️ Назад`,
            `action.${EBotActions.PREV}${prefix ? `.${prefix}` : ''}`,
        ),
        Markup.button.callback(
            `${current}/${total} ${TRANSLATION.page[lang]}`,
            `action.${EBotActions.EMPTY}`,
        ),
        Markup.button.callback(
            `Впёред  ▶️`,
            `action.${EBotActions.NEXT}${prefix ? `.${prefix}` : ''}`,
        ),
    ];

    if (current == 1) {
        buttons.shift();
        buttons.unshift(emptyButton);
    }

    if (current == total || total === 1) {
        buttons.pop();
        buttons.push(emptyButton);
    }

    if (total === 1 || total === 0) {
        buttons = [];
    }

    return buttons;
};
