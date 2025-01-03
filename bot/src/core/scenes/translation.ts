export const TRANSLATION = {
    createWordFirst: (lang: string) => {
        return {
            ru: `Напишите слово на ${lang} языке \n\n📎  Например: house`,
            en: `Write word on ${lang} \n\n📎  Example: house`,
        };
    },

    createWordSecond: {
        ru: 'Напишите перевод этого слова',
        en: 'Write translation of this word',
    },

    createWordEnd: {
        ru: 'Напиши описание, либо свои \nзаметки об этом слове',
        en: 'Write a description or your \nnotes about this word',
    },
};
