import { Character } from '../shared/models/character';
import { State, Selector, StateContext } from '@ngxs/store';
import { CharacterService } from '../core/firebase/character.service';
import { Injector } from '@angular/core';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';

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

    constructor(injector: Injector) {
        CharacterState.charService = injector.get<CharacterService>(CharacterService);
    }

    @Selector()
    public static allCharacters(state: CharacterStateModel) {
        return state.characters;
    }

    @Receiver()
    public static async addCharacter(ctx: StateContext<CharacterStateModel>, action: EmitterAction<Character>) {
        this.charService.addNewCharacter(action.payload)
            .then(() => {
                console.log(`Character was created successfully! Name: ${action.payload.name}`);
            })
            .catch((error) => {
                console.log(`State addCharacter ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async getAllCharacters(ctx: StateContext<CharacterStateModel>) {
        this.charService.getAllCharacters()
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

    // @Selector()
    // public static isAuth(state: DnDUserStateModel) {
    //     return state.auth;
    // }
    // @Receiver()
    // public static addUser(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<DnDUser>) {
    //     ctx.patchState({
    //         user: action.payload
    //     });
    // }
    // @Receiver()
    // public static async createUserwithEmail(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<RegisterFormModel>) {
    //     await this.authService.createUserwithEmail(action.payload)
    //         .then((response) => {
    //             console.log('User was created successfully! ' + response.email);
    //         }).catch((error) => {
    //             console.log(`State CreateUserWithEmail ERROR: ${error}`);
    //         });
    // }

}
