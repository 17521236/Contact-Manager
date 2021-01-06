import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recent',
        loadChildren: () => import('../pages/recent/recent.module').then( m => m.RecentPageModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('../pages/contacts/contacts.module').then( m => m.ContactsPageModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('../pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/contacts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/contacts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
