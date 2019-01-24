import { Action } from '@ngrx/store';
import { DnDUser } from '~/app/shared/models';
import * as UserActions from '../actions/dnduser.action';

export function userReducer(state: DnDUser, action: UserActions.Actions) {
    console.log('IN THE SWIFT');
    console.log(action.type);
    switch (action.type) {
        case UserActions.ADD_USER:
            return action.payload;
        case UserActions.REMOVE_USER:
            return state = null;
        default:
        console.log('DEFAULT');
            return state;
    }
}
