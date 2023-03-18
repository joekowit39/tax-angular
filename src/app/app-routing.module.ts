import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tax-filing',
    pathMatch: 'full',
  },
  {
    path: 'tax-filing',
    loadChildren: () =>
      import('./modules/tax-filing-module/tax-filing.module').then(
        (module) => module.TaxFilingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
