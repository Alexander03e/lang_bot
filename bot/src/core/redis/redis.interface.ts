import { ELangueage } from '@app/shared/enums/entities.enum';
import { EScreen } from '@app/shared/enums/screens.enum';

export interface IState {
    tgId: number | null;
    language: ELangueage | null;
    prevScreen: EScreen | null;
    currentScreen: EScreen | null;
    openScreen: EScreen | null;
    lastMessage: {
        id: number;
        message: string;
    } | null;
}
