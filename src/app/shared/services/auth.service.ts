import { Injectable } from '@angular/core';
import { AuthFirebase } from '../firebase';
import { ServerErrorHandlerService } from '~/app/core/services';
import { DnDUser } from '../models';
import { LoginFormModel, RegisterFormModel } from '../models/forms';

@Injectable()
export class AuthService {

    constructor(
        private repo: AuthFirebase,
        private errorHandler: ServerErrorHandlerService
    ) { }


    public getCurrentUser() {
        this.repo.getCurrentUser(this.errorHandler.handleHttpError,
            (user: DnDUser) => {
                console.log("In Service: User's email:");
                console.log(user.email);
            });
    }

    public signIn(info: LoginFormModel) {
        this.repo.signIn(info, this.errorHandler.handleHttpError,
            () => {
                console.log('User signed in successfully! ' + info.email);
            });
    }

    public createUserwithEmail(info: RegisterFormModel) {
        this.repo.createUserwithEmail(info, this.errorHandler.handleHttpError,
            () => {
                console.log('User was created successfully! ' + info.email);
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
