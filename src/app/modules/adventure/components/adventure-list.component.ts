import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '~/app/shared/models/character';
import { CharacterState } from '~/app/state/character.state';
import { Select } from '@ngxs/store';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import * as app from 'tns-core-modules/application';
import { AdventureState } from '~/app/state/adventure.state';
import { Adventure } from '~/app/shared/models';
import { Emitter, Emittable } from '@ngxs-labs/emitter';

@Component({
    moduleId: module.id,
    selector: 'ns-adventure-list',
    templateUrl: 'adventure-list.component.html'
})

export class AdventureListComponent implements OnInit {
    constructor() { }

    @Select(CharacterState.selectedCharacter) character$: Observable<Character>;
    @Select(AdventureState.getAllAdventures) adventures$: Observable<Adventure>;

    @Emitter(AdventureState.getAllAdventures)
    public getAllAdventures: Emittable<void>;

    ngOnInit() {
        this.getAllAdventures.emit();
     }

     onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
