import { Component, OnInit, ViewChild } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { Character } from '~/app/shared/models/character';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { CharacterState } from '~/app/state/character.state';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { Actions } from '@ngxs/store';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    selector: 'ns-character',
    templateUrl: 'character-list.component.html'
})

export class CharacterListComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) { }

    @Select(CharacterState.allCharacters) characters$: Observable<Character>;
    @Select(CharacterState.isRefreshing) isRefreshing$: Observable<Boolean>;

    @Emitter(CharacterState.chooseCharacter)
    public chooseCharacter: Emittable<Character>;

    @Emitter(CharacterState.getAllCharacters)
    public getAllCharacters: Emittable<void>;

    ngOnInit() {
        this.getAllCharacters.emit();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    public onPullToRefreshInitiated(args: ListViewEventData) {
        this.getAllCharacters.emit();

        this.isRefreshing$.subscribe((isRefreshing: boolean) => {
            if (!isRefreshing) {
                setTimeout(function () {
                    const listView = args.object;
                    listView.notifyPullToRefreshFinished();
                }, 500);
            }
        });
    }

    public onItemSelected(args: ListViewEventData) {
        const listview = args.object as RadListView;
        const selectedCharacter = listview.getSelectedItems() as Array<Character>;

        this.chooseCharacter.emit(selectedCharacter[0]);

        this.routerExtensions.navigate(['/adventure'], { clearHistory: true });
        console.log(selectedCharacter[0].name);
    }
}
