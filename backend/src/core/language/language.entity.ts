import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { WordEntity } from '../word/word.entity';
import { AbstractEntity } from '../database/abstract.entity';

@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity<LanguageEntity> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @ManyToOne(() => UserEntity, user => user.language)
    user: UserEntity;

    @OneToMany(() => WordEntity, word => word.language)
    word: WordEntity[];
}
