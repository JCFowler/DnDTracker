import { DnDUser } from '~/app/shared/models';
import { State, Selector, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Receiver, EmitterAction, Emitter, Emittable } from '@ngxs-labs/emitter';
import { LoginFormModel, RegisterFormModel } from '~/app/shared/models/forms';
import { Injector } from '@angular/core';
import { AuthService } from '../core/firebase';
import { CharacterState } from './character.state';

let LS = require( 'nativescript-localstorage' );

export interface DnDUserStateModel {
    user: DnDUser | null;
    auth: Boolean;
    authError: string;
    registerError: string;
}

@State<DnDUserStateModel>({
    name: 'user',
    defaults: {
        user: null,
        auth: false,
        authError: undefined,
        registerError: undefined
    },
})

export class DnDUserState implements NgxsOnInit {
    private static authService: AuthService;
    private static store: Store;

    constructor(injector: Injector) {
        DnDUserState.authService = injector.get<AuthService>(AuthService);
        DnDUserState.store = injector.get<Store>(Store);
    }

    @Emitter(CharacterState.removeCharacters)
    public static removeCharacters: Emittable<void>;

    ngxsOnInit(ctx: StateContext<DnDUserStateModel>) {
        ctx.patchState({
            authError: undefined,
            registerError: undefined
        });
    }

    @Selector()
    public static getUser(state: DnDUserStateModel) {
        return state.user;
    }

    @Selector()
    public static isAuth(state: DnDUserStateModel) {
        return state.auth;
    }

    @Selector()
    public static authError(state: DnDUserStateModel) {
        return state.authError;
    }

    @Selector()
    public static registerError(state: DnDUserStateModel) {
        return state.registerError;
    }

    @Receiver()
    public static addUser(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<DnDUser>) {
        ctx.patchState({
            user: action.payload
        });
    }

    @Receiver()
    public static async createUserwithEmail(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<RegisterFormModel>) {
        await this.authService.createUserwithEmail(action.payload)
            .then((response) => {
                this.authService.updateUsername(action.payload)
                    .then(() => {
                        const user: DnDUser = {uid: response.uid, name: action.payload.name, email: response.email };
                        this.authService.addUserToCollection(user)
                            .then(() => {
                                console.log('User was added to collection successfully! ' + response.uid);
                                console.log('User was created successfully! ' + response.email);
                            })
                            .catch((error) => {
                                console.log(`State addUserToCollection ERROR: ${error}`);
                            });
                    })
                    .catch((error) => {
                        console.log(`State updateUsername ERROR: ${error}`);
                    });
            }).catch((error) => {
                ctx.patchState({
                    registerError: 'Email address is already in use.'
                });
                console.log(`State CreateUserWithEmail ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async signIn(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<LoginFormModel>) {
        await this.authService.signIn(action.payload)
            .then((response: any) => {
                const u: DnDUser = {uid: response.user.uid, name: response.user.name, email: response.user.email };
                LS.setItem('email', u.email);
                console.log('User signed in successfully! ' + u.email);
                ctx.patchState({
                    user: u,
                    auth: true,
                    authError: undefined
                });
            }).catch((error) => {
                console.log('OMG ERROR');
                console.log(error);
                ctx.patchState({
                    user: null,
                    auth: false,
                    authError: 'Username or Password is incorrect.'
                });
            });
    }

    @Receiver()
    public static logout(ctx: StateContext<DnDUserStateModel>) {
        this.authService.logout()
            .then(() => {
                LS.setItem('email', '');
                console.log('User was loggout out successfully!');
            }).catch((error) => {
                console.log(`State Logout ERROR: ${error}`);
            });

        // Removes all characters.
        this.removeCharacters.emit();

        ctx.setState({
            user: null,
            auth: false,
            authError: undefined,
            registerError: undefined
        });
    }


    @Receiver()
    public static removeUser(ctx: StateContext<DnDUserStateModel>) {
        ctx.patchState({
            user: null
        });
    }
}
