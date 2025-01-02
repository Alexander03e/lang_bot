import { ELangueage } from '@app/shared/enums/entities.enum';
import { TRANSLATION } from '@app/shared/translation';

export const LANGUAGE = {
    [ELangueage.EN]: {
        translate: TRANSLATION.english.ru,
        action: 'action.eng',
    },
    [ELangueage.GE]: {
        translate: TRANSLATION.german.ru,
        action: 'action.ger',
    },
};

export const LANG_LABELS = {
    [ELangueage.EN]: {
        ...TRANSLATION.english,
    },
    [ELangueage.GE]: {
        ...TRANSLATION.german,
    },
};
