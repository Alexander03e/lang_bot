import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';
import { LanguageEntity } from '../language/language.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserEntity> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tgId: number;

    @Column()
    username: string;

    @Column({ default: null, nullable: true })
    first_name: string | null;

    @OneToMany(() => LanguageEntity, language => language.user)
    language: LanguageEntity[];
}
