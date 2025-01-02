import { EScreen } from '@app/shared/enums/screens.enum';
import { TRANSLATION } from '@app/shared/translation';

export const SCREEN_TEXTS = {
    [EScreen.START_MENU]: {
        ...TRANSLATION.start,
    },
    [EScreen.LANG_SELECT]: {
        ...TRANSLATION.langMenu,
    },
};
