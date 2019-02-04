import { Injectable } from '@angular/core';
import { AuthFirebase } from '../firebase';
import { ServerErrorHandlerService } from '~/app/core/services';
import { DnDUser } from '../models';
import { LoginFormModel, RegisterFormModel } from '../models/forms';
import { Observable } from 'rxjs';
import { AppState } from '~/app/core/state/app.state';
import { User } from 'nativescript-plugin-firebase';
import { Store } from '@ngxs/store';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { DnDUserState } from '~/app/core/state/dnduser.state';

let LS = require( 'nativescript-localstorage' );

@Injectable()
export class AuthService {

    currentUser: Observable<DnDUser>;

    @Emitter(DnDUserState.addUser)
    public addUser: Emittable<DnDUser>;

    @Emitter(DnDUserState.addUser)
    public removeUser: Emittable<void>;

    constructor(
        private repo: AuthFirebase,
        // private store: Store<AppState>,
        private store: Store,
        private errorHandler: ServerErrorHandlerService
    ) { }

    public getCurrentUser() {
        this.repo.getCurrentUser(this.errorHandler.handleHttpError,
            (user: User) => {
                console.log('GET CURRENT');
                console.log(user.email);
                console.log(user.uid);
                console.log(user.name);

                // LS.setItem('email', user.email);
                // console.log('^^^');
                // console.log(user.email);
                // let u: DnDUser = {uid: user.uid, name: user.name, email: user.email };
                // this.addUser.emit(u);
                // console.log('User signed in successfully! ' + user.email);
            });
    }

    public signIn(info: LoginFormModel,
        successHandler: () => void) {
        this.repo.signIn(info, this.errorHandler.handleHttpError,
            (user: any) => {
                let u: DnDUser = {uid: user.user.uid, name: user.user.name, email: user.user.email };
                this.addUser.emit(u);
                LS.setItem('email', user.user.email);
                console.log('User signed in successfully! ' + user.user.email);
                successHandler();
            });

    }

    public createUserwithEmail(info: RegisterFormModel) {
        this.repo.createUserwithEmail(info, this.errorHandler.handleHttpError,
            () => {
                console.log('User was created successfully! ' + info.email);
            });
    }

    public logout(successHandler: () => void) {
        this.repo.logout(this.errorHandler.handleHttpError,
            () => {
                LS.setItem('email', '');
                console.log('User was loggout out successfully!');
                console.log(LS.getItem('email'));
                this.removeUser.emit();
                successHandler();
            });
    }
}
