import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'zones',
    loadChildren: () =>
      import('./features/zones/zones.module').then((m) => m.ZonesModule),
    canActivate: [authGuard],
  },
  {
    path: 'crags',
    loadChildren: () =>
      import('./features/crags/crags.module').then((m) => m.CragsModule),
    canActivate: [authGuard],
  },
  {
    path: 'topos',
    loadChildren: () =>
      import('./features/topos/topos.module').then((m) => m.ToposModule),
    canActivate: [authGuard],
  },
  {
    path: 'routes',
    loadChildren: () =>
      import('./features/routes/routes.module').then((m) => m.RoutesModule),
    canActivate: [authGuard],
  },
  {
    path: 'bolters',
    loadChildren: () =>
      import('./features/bolters/bolters.module').then((m) => m.BoltersModule),
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/zones',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/zones',
  },
];
