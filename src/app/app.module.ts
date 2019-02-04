import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgxsModule } from '@ngxs/store';
import { DnDUserState } from './core/state/dnduser.state';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

let LS = require( 'nativescript-localstorage' );

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        CoreModule,
        NativeScriptFormsModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgxsModule.forRoot([ DnDUserState ]),
        NgxsStoragePluginModule.forRoot(),
        NgxsEmitPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
