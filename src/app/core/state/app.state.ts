import { Adventure, DnDUser } from '~/app/shared/models';

export type StateKey = 'adventures' | 'currentUser';

export interface State {
    adventures: Adventure[];
    currentUser: DnDUser;
    [key: string]: any;
}

export const INITIAL_STATE: State = {
    adventures: [],
    currentUser: undefined
};
