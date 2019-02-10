import { Component, OnInit, ViewChild } from '@angular/core';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { RouterExtensions } from 'nativescript-angular/router';

import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

import { LoginFormModel } from '~/app/shared/models/forms';
import { DnDUser } from '~/app/shared/models';
import { DnDUserState } from '~/app/state/dnduser.state';

@Component({
    moduleId: module.id,
    selector: 'ns-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    @ViewChild('loginDataForm') loginDataForm: RadDataFormComponent;

    @Select(DnDUserState.getUser) curUser$: Observable<DnDUser>;
    @Select(DnDUserState.isAuth) isAuth$: Observable<boolean>;
    @Select(DnDUserState.authError) authError$: Observable<string>;

    @Emitter(DnDUserState.signIn)
    public signIn: Emittable<LoginFormModel>;

    public loginForm: LoginFormModel;

    constructor(
        private routerExtenions: RouterExtensions,
    ) { }

    ngOnInit() {
        this.isAuth$.subscribe((authStatus: boolean) => {
            if (authStatus) {
                this.routerExtenions.navigate(['/character'], { clearHistory: true });
            }
        });

        this.loginForm = {
            email: 'hi@email.com',
            password: 'pass12'
        };
     }

     private onLoginTap() {
        this.loginDataForm.dataForm.validateAll()
            .then(ok => {
                if (ok) {
                    this.loginDataForm.dataForm.commitAll();
                    this.signIn.emit(this.loginForm);
                }
            })
            .catch(err => {
                console.log(err);
            });
     }
}
