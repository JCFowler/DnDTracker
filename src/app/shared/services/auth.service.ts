import { Injectable } from '@angular/core';
import { AuthFirebase } from '../firebase';
import { ServerErrorHandlerService } from '~/app/core/services';
import { DnDUser } from '../models';
import { LoginFormModel, RegisterFormModel } from '../models/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '~/app/core/state/app.state';
import * as UserActions from '~/app/core/state/actions/dnduser.action';
import { User } from 'nativescript-plugin-firebase';

@Injectable()
export class AuthService {

    currentUser: Observable<DnDUser>;

    constructor(
        private repo: AuthFirebase,
        private store: Store<AppState>,
        private errorHandler: ServerErrorHandlerService
    ) { }


    public getCurrentUser() {
        this.repo.getCurrentUser(this.errorHandler.handleHttpError,
            (user: User) => {
                this.store.dispatch(new UserActions.AddUser({uid: user.uid, name: user.name, email: user.email }));
            });
    }

    public signIn(info: LoginFormModel) {
        this.repo.signIn(info, this.errorHandler.handleHttpError,
            (user: any) => {
                this.getCurrentUser();
                console.log('User signed in successfully! ' + user.email);
            });
    }

    public createUserwithEmail(info: RegisterFormModel) {
        this.repo.createUserwithEmail(info, this.errorHandler.handleHttpError,
            () => {
                console.log('User was created successfully! ' + info.email);
            });
    }

    public logout() {
        this.repo.logout(this.errorHandler.handleHttpError,
            () => {
                this.store.dispatch(new UserActions.RemoveUser);
                console.log('User was loggout out successfully!');
            });
    }


    // public getPtItem(id: number) {
    //     this.repo.getPtItem(id,
    //         this.errorHandler.handleHttpError,
    //         (ptItem: PtItem) => {

    //             this.setUserAvatarUrl(ptItem.assignee);
    //             ptItem.comments.forEach(c => this.setUserAvatarUrl(c.user));

    //             this.zone.run(() => {
    //                 this.store.set('currentSelectedItem', ptItem);

    //                 // optimistically update the item list with the new item
    //                 const updatedItems = this.store.value.backlogItems.map((item) => {
    //                     return item.id === id ? ptItem : item;
    //                 });

    //                 this.store.set('backlogItems', updatedItems);
    //             });
    //         }
    //     );
    // }
}
