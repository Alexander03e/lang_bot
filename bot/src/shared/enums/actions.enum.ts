export enum EBotActions {
    // Выбрать язык
    SELECT_LANGUAGE = 'set_lang',
    // Посмотреть детали слова
    WORD_DETAILS = 'word_details',
    // Назад
    BACK = 'back',
    // Мои слова
    WORDS = 'words',
    // Создать слово.
    CREATE_WORD = 'create_word',
    // Диалог с ботом
    DIALOGUE = 'dialogue',
    // Перейти к выбору языка
    GO_TO_SELECT_LANG = 'go_to_select_lang',
    // Пропустить шаг
    SKIP = 'skip',
    // Предыдущая страница
    PREV = 'prev',
    // Следующая страница
    NEXT = 'next',
    // Заглушка
    EMPTY = 'empty',
    // Действие со словом
    WORD = 'word',
}

export enum ESceneStatus {
    FINISH,
    IN_PROGRESS,
}

export enum EBaseActions {
    ACTION = 'action',
    DELETE = 'delete',
    EDIT = 'edit',
}
