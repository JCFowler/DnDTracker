import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '~/app/shared/models/character';
import { CharacterState } from '~/app/state/character.state';
import { Select } from '@ngxs/store';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import * as app from 'tns-core-modules/application';
import { Adventure } from '~/app/shared/models';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    selector: 'ns-adventure-list',
    templateUrl: 'adventure-list.component.html'
})

export class AdventureListComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) { }

    @Select(CharacterState.selectedCharacter) character$: Observable<Character>;
    @Select(CharacterState.allAdventures) adventures$: Observable<Adventure>;

    @Emitter(CharacterState.getAllAdventures)
    public getAllAdventures: Emittable<void>;

    @Emitter(CharacterState.chooseAdventure)
    public chooseAdventure: Emittable<Adventure>;

    ngOnInit() {
        this.getAllAdventures.emit();
     }

     public onItemSelected(args: ListViewEventData) {
        const listview = args.object as RadListView;
        const selectedAdventure = listview.getSelectedItems() as Array<Adventure>;

        this.chooseAdventure.emit(selectedAdventure[0]);

        // this.routerExtensions.navigate(['/adventure'], { clearHistory: true });
        console.log(selectedAdventure[0].name);
    }

     onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
