import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonthInterface } from '../../interface/month-interface';
import { YearInterface } from '../../interface/year-interface';
import { FormControl } from '@angular/forms';
import { TaxDataModel } from '../../models/taxData.model';

@Component({
  selector: 'app-tax-filing-page',
  templateUrl: './tax-filing-page.component.html',
  styleUrls: ['./tax-filing-page.component.css'],
})
export class TaxFilingPageComponent implements OnInit {
  // selectedIndex = 0;
  // InputDetail = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // review = this._formBuilder.group({
  //   secondCtrl: '',
  // });
  // isOptional = false;
  taxForm: FormGroup;
  isselectTypeOfFiling: number = 0;
  dataMonth: MonthInterface[] = [];
  dataYear: YearInterface[] = [];
  checkClickResultTotalOfTax: boolean = false;
  saleAmountOld: number = 0;
  taxAmountOld: number = 0;
  alertTxt: boolean = false;
  isReview: boolean = false;
  resultData! :TaxDataModel;
  constructor(private _formBuilder: FormBuilder) {
    this.taxForm = this.createForm();
  }

  ngOnInit() {
    this.setData();
  }

  setData(){
    this.dataMonth = [
      { MonthId: '01', MonthName: 'January' },
      { MonthId: '02', MonthName: 'February' },
      { MonthId: '03', MonthName: 'March' },
      { MonthId: '04', MonthName: 'April' },
      { MonthId: '05', MonthName: 'May' },
      { MonthId: '06', MonthName: 'June' },
      { MonthId: '07', MonthName: 'July' },
      { MonthId: '08', MonthName: 'August ' },
      { MonthId: '09', MonthName: 'September' },
      { MonthId: '10', MonthName: 'October' },
      { MonthId: '11', MonthName: 'November' },
      { MonthId: '12', MonthName: 'December' },
    ];

    let dateMonth = new Date().getMonth() + 1;
    this.dataMonth = this.dataMonth.filter(
      (d) => Number(d.MonthId) <= dateMonth
    );
    this.dataMonth = this.dataMonth.sort((a, b) =>
      a.MonthId > b.MonthId ? -1 : 1
    );
    let dateYear = new Date().getFullYear();
    for (let index = 2020; index <= dateYear; index++) {
      this.dataYear.push({ Year: index.toString() });
    }
    this.dataYear = this.dataYear.sort((a, b) => (a.Year > b.Year ? -1 : 1));
    // console.log(this.dataYear);
    // console.log(this.dataMonth[0].MonthName);
    this.taxForm.patchValue({
      month: this.dataMonth[0].MonthId,
      year: this.dataYear[0].Year,
    });
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      month: '',
      year: '',
      saleAmount: ['', { updateOn: 'blur' }],
      taxAmount: '',
      surcharge: { value: 0, disabled: true },
      penalty: { value: 200, disabled: true },
      totalAmount: { value: 0, disabled: true },
    });
  }

  checkCalculateVat(isCalculate: boolean) {
    if (!isCalculate) {
      if (Number(this.taxForm.getRawValue().saleAmount) != this.saleAmountOld) {
        setTimeout(() => {
          this.saleAmountOld = 0;
          this.taxAmountOld = 0;
          this.taxForm.patchValue({
            taxAmount: Number(this.taxForm.getRawValue().saleAmount) * 0.07,
            surcharge:
              Number(this.taxForm.getRawValue().saleAmount) * 0.07 * 0.1,
            totalAmount:
              Number(this.taxForm.getRawValue().saleAmount) * 0.07 +
              Number(this.taxForm.getRawValue().saleAmount) * 0.07 * 0.1 +
              200.0,
          });
          this.saleAmountOld = Number(this.taxForm.getRawValue().saleAmount);
          this.taxAmountOld = Number(this.taxForm.getRawValue().taxAmount);
        }, 500);
      }
    }
  }

  inputEditVat(idValue: any) {
    let vat = idValue.target.value;

    if (vat != '') {
      // vat - this.taxAmountOld > 20.0
      //   ? (this.alertTxt = true)
      //   : (this.alertTxt = false);
      // vat - this.taxAmountOld < -20.0
      //   ? (this.alertTxt = true)
      //   : (this.alertTxt = false);
      setTimeout(() => {
        this.alertTxt = false;
        if (vat - this.taxAmountOld > 20.0 || vat - this.taxAmountOld < -20.0) {
          this.alertTxt = true;
        } else {
          console.log('000000000000--', this.taxForm.getRawValue().saleAmount);
          this.taxForm.patchValue({
            surcharge: Number(this.taxForm.getRawValue().taxAmount) * 0.1,
            totalAmount:
              Number(this.taxForm.getRawValue().taxAmount) * 0.07 +
              Number(this.taxForm.getRawValue().taxAmount) * 0.07 * 0.1 +
              200.0,
          });
        }
      }, 500);
    }
  }

  handleChangeTypeoffiling(data: any) {
    // console.log(data.target.defaultValue);
    this.isselectTypeOfFiling = data.target.defaultValue;
  }

  onClickNext() {
    if (
        this.taxForm.getRawValue().month != '' &&
        this.taxForm.getRawValue().year != '' &&
        this.taxForm.getRawValue().saleAmount != '' &&
        this.taxForm.getRawValue().taxAmount != ''
    ) {
      let Month =this.dataMonth.find(x=>x.MonthId == this.taxForm.getRawValue().month)?.MonthName; 
      this.resultData = {
        month: Month != null ? Month:"",
        year: this.taxForm.getRawValue().year,
        saleAmount: this.taxForm.getRawValue().saleAmount,
        taxAmount: this.taxForm.getRawValue().taxAmount,
        surcharge: this.taxForm.getRawValue().surcharge,
        penalty: this.taxForm.getRawValue().penalty,
        totalAmount: this.taxForm.getRawValue().totalAmount,
        filingType: this.isselectTypeOfFiling == 0 ? "Ordinary Filing" : "Additional Filing"
      }

      // console.log(this.resultData);
      
      this.isReview = true;
    }
  }
}
