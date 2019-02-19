import { Component, OnInit, ViewChild } from '@angular/core';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { AdventureCreateForm } from '~/app/shared/models/forms/adventure-form.model';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { AdventureState } from '~/app/state/adventure.state';

@Component({
    moduleId: module.id,
    selector: 'ns-adventure-create',
    templateUrl: 'adventure-create.component.html'
})

export class AdventureCreateComponent implements OnInit {
    constructor() { }

    @ViewChild('createDataForm') dataForm: RadDataFormComponent;

    @Emitter(AdventureState.createAdventure)
    public createAdventure: Emittable<AdventureCreateForm>;

    public createForm: AdventureCreateForm;

    ngOnInit() {
        this.createForm = {
            name: 'string',
            session: 1,
            code: 1,
            gold: 1,
            downtime: 1,
            acp: 1,
            renown: 1,
            dmName: 'string',
            dmdciNumber: 'string'
        };
    }

    onCreateAdventure() {
        this.dataForm.dataForm.validateAll()
        .then(ok => {
            if (ok) {
                this.dataForm.dataForm.commitAll();
                this.createForm.uid = this.createForm.name + Date.now();
                this.createAdventure.emit(this.createForm);
            }
        })
        .catch(err => {
            console.log(err);
        });
     }
}
