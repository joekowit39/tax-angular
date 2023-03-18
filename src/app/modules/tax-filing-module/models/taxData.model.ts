
export class TaxDataModel {

    filingType: string;
    month: string;
    year: string;
    saleAmount: number;
    taxAmount: number;
    surcharge: number;
    penalty: number;
    totalAmount: number;
  
    constructor() {
      {
        this.filingType = "";
        this.month = "";
        this.year = "";
        this.saleAmount = 0;
        this.taxAmount = 0;
        this.surcharge = 0;
        this.penalty = 0;
        this.totalAmount = 0;
      }
    }

}


