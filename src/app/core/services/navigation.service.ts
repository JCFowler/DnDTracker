import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { NavigationExtras } from '@angular/router';
import { NavigationOptions } from 'nativescript-angular/router/ns-location-strategy';

@Injectable()
export class NavigationService {

    constructor(private routerExtensions: RouterExtensions) { }

    public navigate(commands: any[], extras?: NavigationExtras & NavigationOptions): Promise<boolean> {
        return this.routerExtensions.navigate(commands, extras);
    }

    public back() {
        this.routerExtensions.back();
    }

    public backToPreviousPage() {
        this.routerExtensions.backToPreviousPage();
    }
}
