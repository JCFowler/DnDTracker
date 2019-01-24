import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormModel } from '~/app/shared/models/forms';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { AuthService } from '~/app/shared/services';
import { Observable } from 'rxjs';
import { DnDUser } from '~/app/shared/models';
import { Store } from '@ngrx/store';
import { AppState } from '~/app/core/state/app.state';

@Component({
    moduleId: module.id,
    selector: 'ns-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    @ViewChild('loginDataForm') loginDataForm: RadDataFormComponent;

    public loginForm: LoginFormModel;

    public curUser: Observable<DnDUser> = this.store.select<DnDUser>('currentUser');

    constructor(
        private authService: AuthService,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.loginForm = {
            email: 'hi@email.com',
            password: 'pass12'
        };

        this.authService.getCurrentUser();

        this.curUser.subscribe(console.log);
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
                this.loginDataForm.dataForm.commitAll();
                console.log(this.loginForm.email);
                console.log(this.loginForm.password);
                this.authService.signIn(this.loginForm);
            }
        })
        .catch(err => {
            console.log(err);
        });
     }
}
