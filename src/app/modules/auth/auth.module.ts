import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { AuthRoutingModule } from './auth.routing';

import { COMPONENTS } from './components';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { CONTAINERS } from './containers';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { SharedModule } from '~/app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        AuthRoutingModule
    ],
    exports: [],
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { }
