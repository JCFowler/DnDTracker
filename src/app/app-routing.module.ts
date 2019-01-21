import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './core/services';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: '~/app/modules/start/home/home.module#HomeModule', canActivate: [AuthGuard] },
    { path: 'browse', loadChildren: '~/app/modules/start/browse/browse.module#BrowseModule' },
    { path: 'search', loadChildren: '~/app/modules/start/search/search.module#SearchModule' },
    { path: 'featured', loadChildren: '~/app/modules/start/featured/featured.module#FeaturedModule' },
    { path: 'settings', loadChildren: '~/app/modules/start/settings/settings.module#SettingsModule' },
    { path: 'auth', loadChildren: '~/app/modules/auth/auth.module#AuthModule' },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

