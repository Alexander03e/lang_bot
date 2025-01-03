import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';
import { LanguageEntity } from '../language/language.entity';
import { WordEntity } from '../word/word.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserEntity> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'character varying' })
    tgId: string;

    @Column()
    username: string;

    @Column({ default: null, nullable: true })
    first_name: string | null;

    @ManyToMany(() => LanguageEntity)
    @JoinTable()
    languages: LanguageEntity[];

    @OneToMany(() => WordEntity, word => word.user)
    words: WordEntity[];
}
