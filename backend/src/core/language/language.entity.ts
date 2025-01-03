import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../database/abstract.entity';

@Entity({ name: 'languages' })
export class LanguageEntity extends AbstractEntity<LanguageEntity> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;
}
