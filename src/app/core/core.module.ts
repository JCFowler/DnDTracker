import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CORE_SERVICES } from './services';
import { API_SERVICES } from './firebase';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        ...API_SERVICES,
        ...CORE_SERVICES
    ],
})
export class CoreModule {
    constructor(
        @Optional() @SkipSelf() parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import CoreModule from AppModule only.');
        }
    }
 }
