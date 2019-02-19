import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AdventureListComponent } from './components/adventure-list.component';
import { AdventureCreateComponent } from './components/create/adventure-create.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdventureListComponent},
            { path: 'create', component: AdventureCreateComponent },
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
export class AdventureRoutingModule { }
