export const TRANSLATION = {
    english: {
        ru: '🇦🇺Английский',
        en: '🇦🇺English',
    },
    german: {
        ru: '🇩🇪Немецкий',
        en: '🇩🇪German',
    },
    langMenu: {
        ru: 'Выберите язык, который хотите учить',
        en: 'Select the language you want to learn',
    },
    start: {
        ru: 'Добро пожаловать в <b>LanguageHelper</b>\n\nПожалуйста, выберите язык, который \nхотите изучать, перед началом работы \nс ботом',
        en: 'Welcome to the bot \n',
    },
    backButton: {
        ru: '◀️Назад',
        en: '◀️Go back',
    },

    mainMenu: (words: number, lang: string) => ({
        ru: `Выберите действие \n\nВыбранный язык: ${lang} \n\nВыученных слов: ${words}`,
        en: `Select action \n\nSelected language: ${lang} \n\nLearned words: ${words}`,
    }),

    words: {
        ru: '📝 Мой словарь',
        en: '📝 My dictionary',
    },

    createWord: {
        ru: '✏️ Записать слово',
        en: '✏️ Write word',
    },

    wordsScreen: (count: number) => ({
        ru: `Мой словарь \n\nЧтобы посмотреть слово, нажмите на него \n\nВсего слов: ${count}`,
        en: `My dictionary \n\nTo open a word, click on it \n\nTotal words: ${count}`,
    }),

    wordDetails: (word: string, translation: string, desc: string) => ({
        ru: `Слово: ${word} \n\nПеревод: ${translation} \n\nОписание: ${desc}`,
        en: `Word: ${word} \n\nTranslation: ${translation} \n\nDescription: ${desc}`,
    }),

    dialog: {
        ru: '🤖 Диалог с ИИ',
        en: '🤖 AI dialogue',
    },

    delete: {
        ru: '❌ Удалить',
        en: '❌ Delete',
    },

    edit: {
        ru: '✏️ Изменить',
        en: '✏️ Edit',
    },

    changeLang: {
        ru: '🏳️‍🌈 Сменить язык',
        en: '🏳️‍🌈 Change language',
    },

    // setLang: {
    //     ru: "Выбран язык"
    // }
};
