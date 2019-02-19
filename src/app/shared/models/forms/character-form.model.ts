import { Character } from '../character';

export interface CharacterCreateForm {
    uid?: string;
    name: string;
    level: number;
    acp: number;
}

export function charFormToCharacter(form: CharacterCreateForm): Character {
    return {
        uid: form.uid,
        name: form.name,
        level: form.level,
        acp: form.acp,
        adventures: []
    };
}
