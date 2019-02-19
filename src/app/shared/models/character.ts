import { Adventure } from './adventure';

export interface Character {
    uid: string;
    name: string;
    level: number;
    acp: number;
    adventures: Array<Adventure>;
}
