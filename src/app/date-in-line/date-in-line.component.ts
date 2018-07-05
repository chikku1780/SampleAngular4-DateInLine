import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-in-line',
  templateUrl: './date-in-line.component.html',
  styleUrls: ['./date-in-line.component.css']
})
export class DateInLineComponent implements OnInit {

  @Input('date') date: Date;

  @Output() dateChange = new EventEmitter<Date>();

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
  public lowerBound: number;
  public upperBound: number;

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
    this.lowerBound = 3;
    this.upperBound = 6;
    this.updateDateRange(true, false, date.getDate());
  }

  onDayChange(value) {
    const prevDayValue = this.day;
    this.day = parseInt(value, 10);
    this.dateChanged(false, prevDayValue);
  }

  onMonthChange(value) {
    this.month = value;
    this.monthMax = this.getMonthMax();
    this.dateChanged(true, this.day);
  }

  onYearChange(value) {
    this.year = value;
    this.updateMonthList();
    this.monthMax = this.getMonthMax();
    this.dateChanged(true, this.day);
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

  dateChanged(isMonthYearChanged, prevDayValue) {
    this.updateDateRange(false, isMonthYearChanged, prevDayValue);
    this.updateDate();
  }

  updateDate() {
    this.date = this.getCurrentDate();
    this.dateChange.emit(this.date);
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
      this.onDayChange(day + 1);
    }
  }

  prevDayParent() {
    const day = parseInt(this.day, 10);
    if (day >= 1) {
      this.onDayChange(day - 1);
    }
  }

  updateDateRange(first, isMonthYearChanged, prevDayValue) {
    prevDayValue = prevDayValue || this.day;
    const newDay = parseInt(this.day, 10);
    const prevDay = parseInt(prevDayValue, 10);
    const differDay = Math.abs((newDay - prevDay));
    if (first || isMonthYearChanged || this.differSuccessive === 5 || differDay > 2 ||
      (newDay === this.dateRangeMin) || (newDay === this.dateRangeMax)) {

      this.dateRangeMin = newDay - this.lowerBound > 0 ? newDay - this.lowerBound : 1;
      this.dateRangeMax = newDay + this.upperBound < this.monthMax ? newDay + this.upperBound : this.monthMax;
      const dateRangeDiff = (this.dateRangeMax - this.dateRangeMin);
      if (dateRangeDiff < 9) {
        if (this.dateRangeMax === this.monthMax) {
          this.dateRangeMin = (this.dateRangeMax - 9);
        } else if (this.dateRangeMin < 3) {
          this.dateRangeMax = 10;
        } else {
          this.dateRangeMax = this.dateRangeMin + (this.dateRangeMax - this.dateRangeMin);
        }
      }
      this.dateRange = this.getRangeOfDates(this.dateRangeMin, this.dateRangeMax);
      this.differSuccessive = 0;

    } else if (this.differSuccessive < 5) {
      this.differSuccessive += 1;
    } else {
      this.differSuccessive = 0;
    }
  }

  getCurrentDate() {
    return new Date(this.getCurrentDateString());
  }

  getCurrentDateString() {
    return (this.year + '-' + this.month + '-' + this.day);
  }

  getSetDate(day, month, year) {
    return new Date(this.getSetDateString(day, month, year));
  }

  getSetDateString(day, month, year) {
    return (year + '-' + month + '-' + day);
  }

  getDayName(date) {
    return date.toString().split(' ')[0];
  }

  getMonth(date) {
    const month = date.getMonth() + 1;
    return (parseInt(month, 10) < 10) ? '0' + month : month;
  }

  checkLeapYear(year) {
    year = parseInt(year, 10);
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
  }

  getRangeOfDates(start, end) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    let startDateDayIndex = this.getSetDate(start, this.month, this.year).getDay();
    const days = [];
    for (let i = start; i <= end; i++) {
      if (startDateDayIndex > 6) {
        startDateDayIndex = 0;
      }
      days.push({
        dayNumber: i,
        dayName: dayNames[startDateDayIndex]
      });
      startDateDayIndex++;
    }
    return days;
  }
}
