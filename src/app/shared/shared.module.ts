import { NgModule } from '@angular/core';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';
import { FIREBASEREPOS } from './firebase';
@NgModule({
    imports: [NativeScriptUIDataFormModule],
    exports: [NativeScriptUIDataFormModule],
    declarations: [],
    providers: [
        ...FIREBASEREPOS
    ],
})
export class SharedModule { }
