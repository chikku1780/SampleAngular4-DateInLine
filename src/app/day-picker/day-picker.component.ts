import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.css'],
  // template: ``
})
export class DayPickerComponent implements OnInit {

  @Input('todayDay') todayDay: number;
  @Input('day') day: number;
  @Input('dateRange') dateRange: number[];

  @Output() clickedPrev = new EventEmitter<string>();
  @Output() clickedNext = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {
  }

  prevDay() {
    this.clickedPrev.emit();
  }

  nextDay() {
    this.clickedNext.emit();
  }


}
