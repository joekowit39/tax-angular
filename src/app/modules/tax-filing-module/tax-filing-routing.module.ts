import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxFilingPageComponent } from './pages';

const routes: Routes = [
  {
    path: "form",
    component: TaxFilingPageComponent,
  },
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxFilingRoutes { }