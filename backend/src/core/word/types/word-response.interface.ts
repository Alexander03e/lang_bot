import { WordEntity } from '../word.entity';

export interface WordResponse {
    words: WordEntity[];
    total: number;
}
