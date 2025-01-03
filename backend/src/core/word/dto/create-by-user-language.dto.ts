import { IsNotEmpty } from 'class-validator';
import { CreateWordDto } from './create-word.dto';

export class CreateByUserLanguageDto extends CreateWordDto {
    @IsNotEmpty()
    tgId: string;

    @IsNotEmpty()
    languageSlug: string;
}
