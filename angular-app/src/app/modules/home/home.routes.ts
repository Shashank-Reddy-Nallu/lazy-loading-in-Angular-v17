import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const HOME_ROUTES: Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];