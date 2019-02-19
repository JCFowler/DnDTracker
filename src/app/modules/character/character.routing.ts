import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { CharacterListComponent } from './components/character-list.component';
import { CharacterCreateComponent } from './components/create/character-create.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: CharacterListComponent },
            { path: 'create', component: CharacterCreateComponent },
            // { path: ':id', component: RegisterComponent }
        ]
    },

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    declarations: [],
    providers: [],
})
export class CharacterRoutingModule { }
