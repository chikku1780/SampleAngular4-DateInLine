import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css'],
  // template: ``
})
export class YearPickerComponent implements OnInit {

  @Input('year') year: number;
  @Input('yearList') yearList: number[];

  constructor() {

  }

  ngOnInit() {

  }

}

