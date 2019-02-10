import { Component, OnInit, ViewChild } from '@angular/core';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';

import { Emitter, Emittable } from '@ngxs-labs/emitter';

import { DnDUserState } from '~/app/state/dnduser.state';
import { RegisterFormModel } from '~/app/shared/models/forms';

@Component({
    moduleId: module.id,
    selector: 'ns-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {

    @ViewChild('registerDataForm') registerDataForm: RadDataFormComponent;

    @Emitter(DnDUserState.createUserwithEmail)
    public createUser: Emittable<RegisterFormModel>;

    public registerForm: RegisterFormModel;

    constructor() { }

    ngOnInit() {
        this.registerForm = {
            name: 'Hello',
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
                this.createUser.emit(this.registerForm);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}
