import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterCreateForm } from '~/app/shared/models/forms/character-form.model';
import { RadDataFormComponent } from 'nativescript-ui-dataform/angular/dataform-directives';
import { Character } from '~/app/shared/models/character';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { CharacterState } from '~/app/state/character.state';

@Component({
    moduleId: module.id,
    selector: 'ns-character-create',
    templateUrl: 'character-create.component.html',
    styleUrls: ['character-create.component.css']
})

export class CharacterCreateComponent implements OnInit {

    @ViewChild('createDataForm') dataForm: RadDataFormComponent;

    @Emitter(CharacterState.createCharacter)
    public createCharacter: Emittable<CharacterCreateForm>;

    public createForm: CharacterCreateForm;

    constructor() {    }

    ngOnInit() {
        this.createForm = {
            name: '',
            level: 1,
            acp: 0
        };
     }

     onCreateCharacter() {
        this.dataForm.dataForm.validateAll()
        .then(ok => {
            if (ok) {
                this.dataForm.dataForm.commitAll();
                this.createForm.uid = this.createForm.name + Date.now();
                this.createCharacter.emit(this.createForm);
            }
        })
        .catch(err => {
            console.log(err);
        });
     }
}
