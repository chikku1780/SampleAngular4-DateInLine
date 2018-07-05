import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-in-line',
  templateUrl: './date-in-line.component.html',
  styleUrls: ['./date-in-line.component.css']
})
export class DateInLineComponent implements OnInit {

  @Input('date') date: Date;

  @Output() dateChange = new EventEmitter<string>();

  constructor() {
  }

  // public date;
  public day;
  public month;
  public year;
  public todayDay;
  public monthList;
  public yearList;
  public monthMax;
  public dateRange;
  public differSuccessive;
  public dateRangeMin;
  public dateRangeMax;

  ngOnInit() {
    // const date = new Date();
    // this.date = date;
    const date = this.date;
    this.day = date.getDate();
    this.month = this.getMonth(date);
    this.year = date.getFullYear();
    this.todayDay = date.getDate();
    this.updateMonthList();
    this.monthMax = this.getMonthMax();
    this.updateYearList();
    this.differSuccessive = 0;
    this.updateDateRange(true, date.getDate());
  }

  onDayChange(value) {
    this.updateDateRange(false, value);
    this.dateChanged();
  }

  onMonthChange(value) {
    this.month = value;
    this.dateChanged();
  }

  onYearChange(value) {
    this.year = value;
    this.updateMonthList();
    this.dateChanged();
  }

  updateMonthList() {
    this.monthList = [
      {value: {seq: '01', days: 31}, name: 'Jan'},
      {value: {seq: '02', days: this.checkLeapYear(this.year) ? 29 : 28}, name: 'Feb'},
      {value: {seq: '03', days: 31}, name: 'Mar'},
      {value: {seq: '04', days: 30}, name: 'Apr'},
      {value: {seq: '05', days: 31}, name: 'May'},
      {value: {seq: '06', days: 30}, name: 'Jun'},
      {value: {seq: '07', days: 31}, name: 'Jul'},
      {value: {seq: '08', days: 31}, name: 'Aug'},
      {value: {seq: '09', days: 30}, name: 'Sep'},
      {value: {seq: '10', days: 31}, name: 'Oct'},
      {value: {seq: '11', days: 30}, name: 'Nov'},
      {value: {seq: '12', days: 31}, name: 'Dec'}
    ];
  }

  updateYearList() {
    const yearList = [];
    const year = parseInt(this.year, 10);
    for (let i = (year - 10); i <= year; i++) {
      yearList.push(i);
    }
    this.yearList = yearList;
  }

  dateChanged() {
    this.monthMax = this.getMonthMax();
    this.updateDate();
    this.updateDateRange(true, this.day);
  }

  updateDate() {
    this.date = new Date(this.year + '-' + this.month + '-' + this.day);
    this.dateChange.emit(this.date.toString());
  }

  getMonthMax() {
    const currentMonth = this.monthList.filter(el => {
      if (el.value.seq === this.month) {
        return el;
      }
    });
    return currentMonth[0].value.days;
  }

  nextDayParent() {
    const day = parseInt(this.day, 10);
    if (day <= this.getMonthMax()) {
      this.onDayChange(this.day + 1);
    }
  }

  prevDayParent() {
    const day = parseInt(this.day, 10);
    if (day >= 1) {
      this.onDayChange(this.day - 1);
    }
  }

  updateDateRange(first, value) {
    const newDay = parseInt(value, 10);
    const prevDay = parseInt(this.day, 10);
    const differ = Math.abs((newDay - prevDay));
    if (first || this.differSuccessive === 2 || differ > 2 ||
      (newDay === this.dateRangeMin) || (newDay === this.dateRangeMax)) {
      this.dateRangeMin = newDay - 3 > 0 ? newDay - 3 : 1;
      this.dateRangeMax = newDay + 4 < this.monthMax ? newDay + 4 : this.monthMax;
      this.dateRange = this.range(this.dateRangeMin, this.dateRangeMax);
      this.differSuccessive = 0;
    } else if (this.differSuccessive < 2) {
      this.differSuccessive += 1;
    } else {
      this.differSuccessive = 0;
    }
    this.day = newDay;
  }

  getMonth(date) {
    const month = date.getMonth() + 1;
    return (parseInt(month, 10) < 10) ? '0' + month : month;
  }

  checkLeapYear(year) {
    year = parseInt(year, 10);
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  }

  range(start, end) {
    const days = [];
    for (let i = start; i <= end; i++) {
      days.push(i);
    }
    return days;
  }
}
