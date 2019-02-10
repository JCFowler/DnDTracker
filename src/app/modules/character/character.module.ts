import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { COMPONENTS } from './components';
import { CharacterRoutingModule } from './character.routing';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        CharacterRoutingModule
    ],
    exports: [],
    declarations: [...COMPONENTS],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CharacterModule { }
