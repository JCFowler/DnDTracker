import { DnDUser } from '~/app/shared/models';
import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';

export class DnDUserStateModel {
    user: DnDUser | null;
}

@State<DnDUserStateModel>({
    name: 'user',
    defaults: {
        user: null
    }
})

export class DnDUserState {
    @Selector()
    public static getUser(state: DnDUserStateModel) {
        return state.user;
    }

    @Receiver()
    public static addUser(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<DnDUser>) {
        ctx.patchState({
            user: action.payload
        });
    }

    @Receiver()
    public static removeUser(ctx: StateContext<DnDUserStateModel>) {
        ctx.patchState({
            user: null
        });
    }
}
