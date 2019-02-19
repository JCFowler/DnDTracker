import { NgModule } from '@angular/core';
import { AdventureRoutingModule } from './adventure.routing';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { COMPONENTS } from './components';
import { SharedModule } from '~/app/shared/shared.module';


@NgModule({
    imports: [
        SharedModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptRouterModule,
        AdventureRoutingModule],
    exports: [],
    declarations: [...COMPONENTS],
    providers: [],
})
export class AdventureModule { }
