import { ELangueage } from '@app/shared/enums/entities.enum';
import { EBotLang, EScreen, EScreenAction } from '@app/shared/enums/screens.enum';

export interface IState {
    tgId: number | null;
    language: ELangueage | null;
    prevScreen: EScreen | null;
    currentScreen: EScreen | null;
    openScreen: EScreen | null;
    screenAction: EScreenAction | null;
    lastMessage: {
        id: number;
        message: string;
        isInlineKeyboard?: boolean;
    } | null;
    lang: EBotLang | null;
    sceneData: unknown;

    words: {
        translates: boolean;
        displayMode: 'BUTTONS' | 'INLINE' | null;
    };

    pagination: {
        total: number;
        currentPage: number;
    };
}
