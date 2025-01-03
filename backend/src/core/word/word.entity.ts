import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LanguageEntity } from '../language/language.entity';
import { AbstractEntity } from '../database/abstract.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'words' })
export class WordEntity {
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
        default: '',
    })
    description: string;

    @ManyToOne(() => LanguageEntity)
    language: LanguageEntity;

    @ManyToOne(() => UserEntity, user => user.words)
    user: UserEntity;
}
