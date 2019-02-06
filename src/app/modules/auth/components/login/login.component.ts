import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormModel } from '~/app/shared/models/forms';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { Observable } from 'rxjs';
import { DnDUser } from '~/app/shared/models';
import { Store, Select } from '@ngxs/store';
import { AppState } from '~/app/core/state/app.state';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { DnDUserState } from '~/app/core/state/dnduser.state';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    selector: 'ns-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    @ViewChild('loginDataForm') loginDataForm: RadDataFormComponent;

    public loginForm: LoginFormModel;

    @Emitter(DnDUserState.signIn)
    public signIn: Emittable<LoginFormModel>;

    @Select(DnDUserState.getUser) curUser$: Observable<DnDUser>;

    @Select(DnDUserState.isAuth) isAuth$: Observable<boolean>;

    // @Select(DnDUserState)
    // curUser$: Observable<DnDUser>;

    constructor(
        private store: Store,
        private routerExtenions: RouterExtensions,
    ) {
    }

    ngOnInit() {
        this.isAuth$.subscribe((authStatus: boolean) => {
            if (authStatus) {
                this.routerExtenions.navigate(['/home'], { clearHistory: true });
            }
        });

        console.log('local:');
        this.loginForm = {
            email: 'hi@email.com',
            password: 'pass12'
        };

        this.curUser$.subscribe((user) => {
            console.log('subscriped');
            console.dir(user);
            console.log('###');
        });

        // this.curUser.subscribe(console.log);
     }

     private onPropertyCommitted() {
                    //  console.log(this.loginFormData.email);
                    // console.log(this.loginFormData.password);
        //  this.loginDataForm.dataForm.validateAll()
        //     .then(ok => {
        //         if (ok) {
        //             console.log('OK!');
        //             console.log(this.loginFormData.email);
        //             console.log(this.loginFormData.password);
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
     }

     private onLoginTap() {
        this.loginDataForm.dataForm.validateAll()
            .then(ok => {
                if (ok) {
                    this.signIn.emit(this.loginForm);
                }
        })
        .catch(err => {
            console.log(err);
        });
     }
}
