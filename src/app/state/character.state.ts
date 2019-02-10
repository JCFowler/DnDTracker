import { Character } from '../shared/models/character';
import { State, Selector, StateContext, Store } from '@ngxs/store';
import { CharacterService } from '../core/firebase/character.service';
import { Injector } from '@angular/core';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { DnDUserState } from './dnduser.state';

export interface CharacterStateModel {
    characters: Character[];
}

@State<CharacterStateModel>({
    name: 'characters',
    defaults: {
        characters: []
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

    @Receiver()
    public static async addCharacter(ctx: StateContext<CharacterStateModel>, action: EmitterAction<Character>) {
        const user = this.store.selectSnapshot(DnDUserState.getUser);

        this.charService.addNewCharacter(action.payload, user.uid)
            .then(() => {
                console.log(`Character was created successfully! Name: ${action.payload.name}`);
            })
            .catch((error) => {
                console.log(`State addCharacter ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async getAllCharacters(ctx: StateContext<CharacterStateModel>) {
        const user = this.store.selectSnapshot(DnDUserState.getUser);

        this.charService.getAllCharacters(user.uid)
            .then((response) => {
                let chars: Character[] = [];

                response.forEach(doc => {
                    chars.push(<Character>doc.data());
                });

                ctx.patchState({
                    characters: chars
                });
                console.log(`Get All Characters was successful!`);
            })
            .catch((error) => {
                console.log(`State addCharacter ERROR: ${error}`);
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
