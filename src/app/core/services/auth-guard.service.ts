import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

let LS = require( 'nativescript-localstorage' );

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private routerExtenions: RouterExtensions,
    ) { }

    public canActivate(): boolean {
        console.log('AUTH GUARD');
        let email: string = LS.getItem('email');

        if (email != null && email !== '') {
            return true;
        } else {
            this.routerExtenions.navigate(['/auth/login'], { clearHistory: true });
            return false;
        }
    }
}
