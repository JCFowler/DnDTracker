import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Character } from '~/app/shared/models/character';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { CharacterService } from '~/app/core/firebase/character.service';
import { City } from '~/app/shared/models';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { CharacterState } from '~/app/state/character.state';

@Component({
    moduleId: module.id,
    selector: 'ns-character',
    templateUrl: 'character-list.component.html'
})

export class CharacterListComponent implements OnInit {

    constructor(private charService: CharacterService) { }

    @Select(CharacterState.allCharacters) characters$: Observable<Character>;

    @Emitter(CharacterState.getAllCharacters)
    public getAllCharacters: Emittable<void>;

    ngOnInit() {
        this.getAllCharacters.emit();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    addChar() {
        // for (let i = 0; i < 10; i++) {
        //     const c: Character = {
        //         uid: `UID${i}`,
        //         name: `CHARACTER${i}`,
        //         level: i,
        //         acp: i * 2,
        //         adventures: null
        //     };
        //     this.charService.addNewCharacter(c);
        // }
    }
}
