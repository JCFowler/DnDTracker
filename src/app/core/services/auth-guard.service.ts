import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs';
import { DnDUser } from '~/app/shared/models';
import { AppState } from '../state/app.state';
import { Select, Store } from '@ngxs/store';
import { DnDUserState, DnDUserStateModel } from '../state/dnduser.state';
import { AuthService } from '~/app/shared/services';

let LS = require( 'nativescript-localstorage' );

@Injectable()
export class AuthGuard implements CanActivate {

    @Select(DnDUserState.getUser) currentUser$: Observable<DnDUser>;

    constructor(
        private routerExtenions: RouterExtensions,
        private store: Store,
        // private authService: AuthService
    ) { }

    public canActivate(): boolean {
        // this.routerExtenions.navigate(['/auth/login'], { clearHistory: true });
        // return false;

        let email: string = LS.getItem('email');
        console.log('Email***:');
        console.log(email);

        if (email != null && email !== '') {
            return true;
        } else {
            this.routerExtenions.navigate(['/auth/login'], { clearHistory: true });
            return false;
        }
        // Check if user is logged in.
// console.dir(this.curUser.source);

        // this.authService.getCurrentUser();
        // const token = this.store.selectSnapshot<DnDUser>((state: DnDUserStateModel) => state.user);

        // console.log('%%%');
        // // console.log(token);

        // let isLoggedIn = false;
        // this.currentUser$.subscribe((user) => {
        //     if (user) {
        //         isLoggedIn = true;
        //     }
        // });


        // if (isLoggedIn) {
        //     return true;
        // } else {
        //     this.routerExtenions.navigate(['/auth/login'], { clearHistory: true });
        // return false;
        // }
    }
}
