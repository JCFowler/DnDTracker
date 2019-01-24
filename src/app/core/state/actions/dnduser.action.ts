import { Action } from '@ngrx/store';
import { DnDUser } from '~/app/shared/models';

export const ADD_USER = 'USER ADD';
export const REMOVE_USER = 'USER REMOVE';

export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor(public payload: DnDUser) {
        console.log('Here11');
    }
}

export class RemoveUser implements Action {
    readonly type = REMOVE_USER;
}

export type Actions = AddUser | RemoveUser;
