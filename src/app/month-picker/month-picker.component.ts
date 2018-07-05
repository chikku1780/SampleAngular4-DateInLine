import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
  // template: ``
})

export class MonthPickerComponent implements OnInit {

  @Input('month') month: string;
  @Input('monthList') monthList: object[];

  constructor() {

  }

  ngOnInit() {
    // console.log(this.month);
  }


}
