import {Component, OnInit} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public date: Date;

  constructor() {
  }

  ngOnInit() {
    this.date = new Date();
  }

  dateChange() {
    console.log(this.date);
  }

}
