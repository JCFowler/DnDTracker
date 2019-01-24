import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Observable } from 'rxjs';
import { DnDUser } from '~/app/shared/models';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {

    public curUser: Observable<DnDUser> = this.store.select<DnDUser>('currentUser');

    constructor(
        private routerExtenions: RouterExtensions,
        private store: Store<AppState>
    ) { }

    public canActivate(): boolean {
        // Check if user is logged in.
console.dir(this.curUser.source);
        if (this.curUser) {
            return true;
        } else {
            this.routerExtenions.navigate(['/auth/login'], { clearHistory: true });
        return false;
        }
    }
}
