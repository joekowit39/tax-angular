import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TaxDataModel } from 'src/app/modules/tax-filing-module/models/taxData.model';

@Component({
  selector: 'app-tax-filing-review',
  templateUrl: './tax-filing-review.component.html',
  styleUrls: ['./tax-filing-review.component.css']
})
export class TaxFilingReviewComponent implements OnInit {

  @Input() itemTax! : TaxDataModel; 


  constructor(config: NgbModalConfig, private modalService: NgbModal) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
  }

  open(content: any) {
		this.modalService.open(content);
	}
}
