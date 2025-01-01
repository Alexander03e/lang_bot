import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageEntity } from '../language/language.entity';
import { AbstractEntity } from '../database/abstract.entity';

@Entity({ name: 'words' })
export class WordEntity extends AbstractEntity<WordEntity> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: 'Слово',
    })
    word: string;

    @Column({
        comment: 'Перевод слова',
    })
    translation: string;

    @Column({
        comment: 'Описание',
    })
    description: string;

    @ManyToOne(() => LanguageEntity, language => language.word)
    language: LanguageEntity;
}
