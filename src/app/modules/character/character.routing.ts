import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { CharacterListComponent } from './components/character-list.component';

const routes: Routes = [
    {
        path: '',
        component: CharacterListComponent,
        // children: [
        //     { path: 'login', component: LoginComponent },
        //     { path: 'register', component: RegisterComponent }
        // ]
    },

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    declarations: [],
    providers: [],
})
export class CharacterRoutingModule { }
