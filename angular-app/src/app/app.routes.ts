import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.routes').then((m) => m.HOME_ROUTES)
    },
    {
        path: 'about',
        loadChildren: () => import('./modules/about/about.routes').then((m) => m.ABOUT_ROUTES)
    },
    {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then((m) => m.SETTINGS_ROUTES)
    },

    // You can also Lazy load a specific component
    {
        path: '**',
        loadComponent: () => import('./shared/components/page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent)
    }
];