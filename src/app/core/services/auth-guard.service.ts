import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private routerExtenions: RouterExtensions
    ) { }

    public canActivate(): boolean {
        // Check if user is logged in.
        this.routerExtenions.navigate(['/auth/login'], { clearHistory: true });
        return false;
    }
}
