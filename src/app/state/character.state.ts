import { Character } from '../shared/models/character';
import { State, Selector, StateContext, Store } from '@ngxs/store';
import { CharacterService } from '../core/firebase/character.service';
import { Injector } from '@angular/core';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { DnDUserState } from './dnduser.state';
import { CharacterCreateForm, charFormToCharacter } from '../shared/models/forms/character-form.model';
import { AdventureService } from '../core/firebase/adventure.service';
import { Adventure } from '../shared/models';
import { AdventureCreateForm, advFormToAdventure } from '../shared/models/forms/adventure-form.model';

export interface CharacterStateModel {
    characters: Character[];
    isRefreshing?: Boolean;
    selectedCharacter?: Character;
    selectedAdventure?: Adventure;
}

@State<CharacterStateModel>({
    name: 'characters',
    defaults: {
        characters: [],
        isRefreshing: false,
        selectedCharacter: undefined,
        selectedAdventure: undefined
    },
})

export class CharacterState {
    private static charService: CharacterService;
    private static advService: AdventureService;
    private static store: Store;

    constructor(injector: Injector) {
        CharacterState.charService = injector.get<CharacterService>(CharacterService);
        CharacterState.advService = injector.get<AdventureService>(AdventureService);
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

    @Selector()
    public static allAdventures(state: CharacterStateModel) {
        return state.selectedCharacter.adventures;
    }

    @Selector()
    public static selectedAdventure(state: CharacterStateModel) {
        return state.selectedAdventure;
    }

    @Receiver()
    public static async createCharacter(ctx: StateContext<CharacterStateModel>, action: EmitterAction<CharacterCreateForm>) {
        const user = this.store.selectSnapshot(DnDUserState.getUser);

        this.charService.createNewCharacter(action.payload, user.uid)
            .then(() => {
                let charModel = ctx.getState();
                charModel.characters.push(charFormToCharacter(action.payload));
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

    @Receiver()
    public static async getAllAdventures(ctx: StateContext<CharacterStateModel>) {

        const user = this.store.selectSnapshot(DnDUserState.getUser);

        this.advService.getAllAdventures(user.uid, ctx.getState().selectedCharacter.uid)
            .then((response) => {
                let advs: Adventure[] = [];

                response.forEach(doc => {
                    advs.push(<Adventure>doc.data());
                });

                const newCharState = this.updateCharactersAdventures(ctx, advs);

                ctx.patchState({
                    characters: newCharState.characters,
                    selectedCharacter: newCharState.selectedCharacter,
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
    public static async createAdventure(ctx: StateContext<CharacterStateModel>, action: EmitterAction<AdventureCreateForm>) {
        const user = this.store.selectSnapshot(DnDUserState.getUser);
        const char = this.store.selectSnapshot(CharacterState.selectedCharacter);

        this.advService.createNewAdventure(action.payload, user.uid, char.uid)
            .then(() => {
                let charState = ctx.getState();
                const advs: Adventure[] = charState.selectedCharacter.adventures;
                advs.push(advFormToAdventure(action.payload));

                const newCharState = this.updateCharactersAdventures(ctx, advs);

                ctx.patchState({
                    characters: newCharState.characters,
                    selectedCharacter: newCharState.selectedCharacter,
                });
                console.log(`Adventure was created successfully! Name: ${action.payload.name}`);
            })
            .catch((error) => {
                console.log(`State createAdventure ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async chooseAdventure(ctx: StateContext<CharacterStateModel>, action: EmitterAction<Adventure>) {
        ctx.patchState({
            selectedAdventure: action.payload
        });
    }

    private static updateCharactersAdventures(ctx: StateContext<CharacterStateModel>, advs: Adventure[]) {
        let charState = ctx.getState();

        charState.characters.forEach((c) => {
            if (c.uid === ctx.getState().selectedCharacter.uid) {
                c.adventures = advs;
                charState.selectedCharacter.adventures = advs;
            }
        });

        return charState;
    }
}
