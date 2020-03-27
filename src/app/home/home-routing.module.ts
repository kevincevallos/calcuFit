import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'datos',
        loadChildren: () =>
        import('../pages/datos/datos.module').then(
          m => m.DatosPageModule
        )
      },
      {
        path: 'alimentos',
        loadChildren: () =>
        import('../pages/alimentos/alimentos.module').then(
          m => m.AlimentosPageModule
        )
      },
      {
        path: 'dieta',
        loadChildren: () =>
        import('../pages/dieta/dieta.module').then(
          m => m.DietaPageModule
        )
      },
      {
        path: 'settings',
        loadChildren: () =>
        import('../pages/settings/settings.module').then(
          m => m.SettingsPageModule
        )
      },
      {
        path: 'welcome',
        loadChildren: () =>
        import('../pages/welcome/welcome.module').then(
          m => m.WelcomePageModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
