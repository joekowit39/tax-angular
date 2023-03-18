import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxFilingRoutes } from './tax-filing-routing.module';
import { TaxFilingPageComponent } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularMaterialModule } from 'src/app/shared/material/angular-material.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideDirective } from 'src/app/shared/directives/clickOutside.directive';
import { TaxFilingReviewComponent } from './pages/tax-filing-page/component/tax-filing-review/tax-filing-review.component';

@NgModule({
  declarations: [TaxFilingPageComponent,ClickOutsideDirective,TaxFilingReviewComponent],
  imports: [CommonModule, TaxFilingRoutes, FormsModule,ReactiveFormsModule,NgbDropdownModule ],
})
export class TaxFilingModule { }
