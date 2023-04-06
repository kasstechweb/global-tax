import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'personal-taxes',
    loadChildren: () => import('./personal-taxes/personal-taxes.module').then( m => m.PersonalTaxesPageModule)
  },
  {
    path: 'existing-client',
    loadChildren: () => import('./existing-client/existing-client.module').then( m => m.ExistingClientPageModule)
  },
  {
    path: 'new-client',
    loadChildren: () => import('./new-client/new-client.module').then( m => m.NewClientPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'business-taxes',
    loadChildren: () => import('./business-taxes/business-taxes.module').then( m => m.BusinessTaxesPageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
