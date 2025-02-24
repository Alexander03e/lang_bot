import { UserEntity } from '../user.entity';

export type UserByIdResponse = UserEntity & {
    wordsCount: number;
    languages: {
        wordsCount?: number;
    }[];
};
