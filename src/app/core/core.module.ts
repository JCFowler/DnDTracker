import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Store } from './state/app.store';
import { SERVICES } from './services';

@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
        Store,
        ...SERVICES
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
