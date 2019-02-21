import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { CharacterState } from '~/app/state/character.state';
import { Observable } from 'rxjs';
import { Character } from '~/app/shared/models/character';

@Component({
    moduleId: module.id,
    selector: 'ns-character-item',
    templateUrl: 'character-item.component.html'
})

export class CharacterItemComponent implements OnInit {
    constructor() { }

    @Input() character: string;

    ngOnInit() {
     }
}
