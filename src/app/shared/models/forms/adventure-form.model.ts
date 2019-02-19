import { Adventure } from '../adventure';

export interface AdventureCreateForm {
    uid?: string;
    name: string;
    session: number;
    code: number;
    gold: number;
    downtime: number;
    acp: number;
    renown: number;
    dmName: string;
    dmdciNumber: string;
}

export function advFormToAdventure(form: AdventureCreateForm): Adventure {
    return {
        uid: form.uid,
        name: form.name,
        session: form.session,
        code: form.code,
        gold: form.gold,
        downtime: form.downtime,
        acp: form.acp,
        renown: form.renown,
        dmName: form.dmName,
        dmdciNumber: form.dmdciNumber
    };
}
