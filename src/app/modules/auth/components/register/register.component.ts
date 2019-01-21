import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterFormModel } from '~/app/shared/models/forms';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';

@Component({
    moduleId: module.id,
    selector: 'ns-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

    @ViewChild('registerDataForm') registerDataForm: RadDataFormComponent;

    public registerForm: RegisterFormModel;

    constructor() { }

    ngOnInit() {
        this.registerForm = {
            email: 'hi@email.com',
            password: 'pass12',
            verifyPass: 'pass12'
        };
    }

    private onRegisterTap() {
        this.registerDataForm.dataForm.validateAll()
        .then(ok => {
            if (ok) {
                this.registerDataForm.dataForm.commitAll();
                console.log(this.registerForm.email);
                console.log(this.registerForm.password);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}
