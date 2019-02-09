import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { filter } from 'rxjs/operators';
import * as app from 'tns-core-modules/application';

import firebase = require('nativescript-plugin-firebase');
import { Select } from '@ngxs/store';
import { DnDUserState } from './state/dnduser.state';
import { Observable } from 'rxjs';
import { DnDUser } from './shared/models';

@Component({
    moduleId: module.id,
    selector: 'ns-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    @Select(DnDUserState.isAuth) isAuth$: Observable<boolean>;
    @Select(DnDUserState.getUser) curUser$: Observable<DnDUser>;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this.firebaseInit();

        this._activatedUrl = '/home';
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
            console.log('Navigating to: ' + event.urlAfterRedirects);
            this._activatedUrl = event.urlAfterRedirects;
        });

        this.isAuth$.subscribe((authStatus: boolean) => {
            if (!authStatus) {
                this.routerExtensions.navigate(['/auth/login'], { clearHistory: true });
            }
        });
    }

    firebaseInit() {
        console.log('Started firebase Init');
        firebase.init({
            onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
              console.log(data.loggedIn ? 'Logged in to firebase' : 'Logged out from firebase');
              if (data.loggedIn) {
                console.log("user's email address: " + (data.user.email ? data.user.email : 'N/A'));
              }
            }
          });

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: 'fade'
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
