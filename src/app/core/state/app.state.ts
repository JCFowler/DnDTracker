import { Adventure, DnDUser } from '~/app/shared/models';

export type StateKey = 'adventures' | 'currentUser';

export interface AppState {
    // readonly adventures: Adventure[];
    currentUser: DnDUser;
    reducer: {
        currentUser: DnDUser
    };
}

// export const INITIAL_STATE: State = {
//     adventures: [],
//     currentUser: undefined
// };
