export type TLanguage = {
    id: number;
    slug: string;
};

export type TUserById = {
    id: number;
    tgId: string;
    username: string;
    first_name: string;
    wordsCount: number;
};

export type TWord = {
    id: number;
    word: string;
    translation: string;
    description: string;
};

export type TUserWords = {
    words: TWord[];
    total: number;
};


