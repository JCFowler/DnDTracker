import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginFormModel } from '~/app/shared/models/forms';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { AuthService } from '~/app/shared/services';

@Component({
    moduleId: module.id,
    selector: 'ns-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    @ViewChild('loginDataForm') loginDataForm: RadDataFormComponent;

    public loginForm: LoginFormModel;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loginForm = {
            email: 'email@email.com',
            password: 'pass'
        };

        this.authService.getCurrentUser();
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
