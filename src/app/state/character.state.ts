import { Character } from '../shared/models/character';
import { State, Selector, StateContext, Store } from '@ngxs/store';
import { CharacterService } from '../core/firebase/character.service';
import { Injector } from '@angular/core';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { DnDUserState } from './dnduser.state';
import { CharacterCreateForm, charFormToCharacter } from '../shared/models/forms/character-form.model';

export interface CharacterStateModel {
    characters: Character[];
    isRefreshing?: Boolean;
    selectedCharacter?: Character;
}

@State<CharacterStateModel>({
    name: 'characters',
    defaults: {
        characters: [],
        isRefreshing: false,
        selectedCharacter: undefined
    },
})

export class CharacterState {
    private static charService: CharacterService;
    private static store: Store;

    constructor(injector: Injector) {
        CharacterState.charService = injector.get<CharacterService>(CharacterService);
        CharacterState.store = injector.get<Store>(Store);
    }

    @Selector()
    public static allCharacters(state: CharacterStateModel) {
        return state.characters;
    }

    @Selector()
    public static isRefreshing(state: CharacterStateModel) {
        return state.isRefreshing;
    }

    @Selector()
    public static selectedCharacter(state: CharacterStateModel) {
        return state.selectedCharacter;
    }

    @Receiver()
    public static async createCharacter(ctx: StateContext<CharacterStateModel>, action: EmitterAction<CharacterCreateForm>) {
        const user = this.store.selectSnapshot(DnDUserState.getUser);

        this.charService.createNewCharacter(action.payload, user.uid)
            .then(() => {
                let charModel = ctx.getState();
                charModel.characters.push(charFormToCharacter(action.payload));
                console.log('Hete');
                console.dir(charModel);
                ctx.patchState({
                    characters: charModel.characters
                });
                console.log(`Character was created successfully! Name: ${action.payload.name}`);
            })
            .catch((error) => {
                console.log(`State addCharacter ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async getAllCharacters(ctx: StateContext<CharacterStateModel>) {
        ctx.patchState({ isRefreshing: true });

        const user = this.store.selectSnapshot(DnDUserState.getUser);

        this.charService.getAllCharacters(user.uid)
            .then((response) => {
                let chars: Character[] = [];

                response.forEach(doc => {
                    chars.push(<Character>doc.data());
                });

                ctx.patchState({
                    characters: chars,
                    isRefreshing: false
                });
                console.log(`Get All Characters was successful!`);
            })
            .catch((error) => {
                ctx.patchState({ isRefreshing: false });
                console.log(`State addCharacter ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async chooseCharacter(ctx: StateContext<CharacterStateModel>, action: EmitterAction<Character>) {
        ctx.patchState({
            selectedCharacter: action.payload
        });
    }

    @Receiver()
    public static async removeCharacters(ctx: StateContext<CharacterStateModel>) {
        console.log('REMOVE CHARACTERS');
        ctx.setState({
            characters: []
        });
    }
}
