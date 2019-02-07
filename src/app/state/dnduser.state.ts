import { DnDUser } from '~/app/shared/models';
import { State, Selector, StateContext } from '@ngxs/store';
import { Receiver, EmitterAction } from '@ngxs-labs/emitter';
import { LoginFormModel, RegisterFormModel } from '~/app/shared/models/forms';
import { Injector } from '@angular/core';
import { AuthService } from '../core/firebase';

let LS = require( 'nativescript-localstorage' );

export interface DnDUserStateModel {
    user: DnDUser | null;
    auth: Boolean;
    authError: String;
}

@State<DnDUserStateModel>({
    name: 'user',
    defaults: {
        user: null,
        auth: false,
        authError: undefined
    },
})

export class DnDUserState {
    private static authService: AuthService;

    constructor(injector: Injector) {
        DnDUserState.authService = injector.get<AuthService>(AuthService);
    }

    @Selector()
    public static getUser(state: DnDUserStateModel) {
        return state.user;
    }

    @Selector()
    public static isAuth(state: DnDUserStateModel) {
        return state.auth;
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
                console.log('User was created successfully! ' + response.email);
            }).catch((error) => {
                console.log(`State CreateUserWithEmail ERROR: ${error}`);
            });
    }

    @Receiver()
    public static async signIn(ctx: StateContext<DnDUserStateModel>, action: EmitterAction<LoginFormModel>) {
        await this.authService.signIn(action.payload)
            .then((response: any) => {
                let u: DnDUser = {uid: response.user.uid, name: response.user.name, email: response.user.email };
                LS.setItem('email', u.email);
                console.log('User signed in successfully! ' + u.email);
                ctx.patchState({
                    user: u,
                    auth: true,
                    authError: undefined
                });
            }).catch((error) => {
                console.log(error);
                ctx.patchState({
                    user: null,
                    auth: false,
                    authError: error
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
        ctx.patchState({
            user: null,
            auth: false,
            authError: undefined
        });
    }

    @Receiver()
    public static removeUser(ctx: StateContext<DnDUserStateModel>) {
        ctx.patchState({
            user: null
        });
    }
}
