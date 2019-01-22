import { NgModule } from '@angular/core';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { SERVICES } from './services';
import { FIREBASEREPOS } from './firebase';
@NgModule({
    imports: [NativeScriptUIDataFormModule],
    exports: [NativeScriptUIDataFormModule],
    declarations: [],
    providers: [
        ...SERVICES,
        ...FIREBASEREPOS
    ],
})
export class SharedModule { }
