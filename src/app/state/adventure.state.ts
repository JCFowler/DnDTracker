import { State, Store, Selector, StateContext } from '@ngxs/store';
import { Adventure } from '../shared/models';
import { AdventureService } from '../core/firebase/adventure.service';
import { Injector } from '@angular/core';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { AdventureCreateForm, advFormToAdventure } from '../shared/models/forms/adventure-form.model';
import { DnDUserState } from './dnduser.state';
import { CharacterState } from './character.state';

export interface AdventureStateModel {
    adventures: Adventure[];
    isRefreshing?: Boolean;
    selectedAdventure?: Adventure;
}

@State<AdventureStateModel>({
    name: 'adventures',
    defaults: {
        adventures: [],
        isRefreshing: false,
        selectedAdventure: undefined
    },
})

export class AdventureState {
    private static advService: AdventureService;
    private static store: Store;

    constructor(injector: Injector) {
        AdventureState.advService = injector.get<AdventureService>(AdventureService);
        AdventureState.store = injector.get<Store>(Store);
    }

    @Selector()
    public static allCharacters(state: AdventureStateModel) {
        return state.adventures;
    }

    @Selector()
    public static isRefreshing(state: AdventureStateModel) {
        return state.isRefreshing;
    }

    @Selector()
    public static selectedCharacter(state: AdventureStateModel) {
        return state.selectedAdventure;
    }

    @Receiver()
    public static async createAdventure(ctx: StateContext<AdventureStateModel>, action: EmitterAction<AdventureCreateForm>) {
        const user = this.store.selectSnapshot(DnDUserState.getUser);
        const char = this.store.selectSnapshot(CharacterState.selectedCharacter);

        this.advService.createNewAdventure(action.payload, user.uid, char.uid)
            .then(() => {
                let advModel = ctx.getState();
                advModel.adventures.push(advFormToAdventure(action.payload));
                console.log('Hete');
                console.dir(advModel);
                ctx.patchState({
                    adventures: advModel.adventures
                });
                console.log(`Adventure was created successfully! Name: ${action.payload.name}`);
            })
            .catch((error) => {
                console.log(`State createAdventure ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async getAllAdventures(ctx: StateContext<AdventureStateModel>) {
        // ctx.patchState({ isRefreshing: true });

        const user = this.store.selectSnapshot(DnDUserState.getUser);
        const char = this.store.selectSnapshot(CharacterState.selectedCharacter);

        this.advService.getAllAdventures(user.uid, char.uid)
            .then((response) => {
                let advs: Adventure[] = [];

                response.forEach(doc => {
                    advs.push(<Adventure>doc.data());
                });

                ctx.patchState({
                    adventures: advs,
                    isRefreshing: false
                });
                console.log(`Get All Adventures was successful!`);
            })
            .catch((error) => {
                ctx.patchState({ isRefreshing: false });
                console.log(`State getAllAdventures ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async chooseAdventure(ctx: StateContext<AdventureStateModel>, action: EmitterAction<Adventure>) {
        ctx.patchState({
            selectedAdventure: action.payload
        });
    }
}
