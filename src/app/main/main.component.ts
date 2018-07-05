import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formdata;
  cutomerdata = [];

  constructor(private http: Http) {
  }

  stateCtrl: FormControl;

  ngOnInit() {
    this.formdata = new FormGroup({
      fname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      address: new FormControl(''),
      phoneno: new FormControl('')
    });
  }

  onClickSubmit(data) {
    const self = this;
    console.log(data);
    document.getElementById('custtable').style.display = '';
    Object.keys(data).forEach(function (element) {
      console.log(element + ' ' + data[element]);
      self.cutomerdata.push(data[element]);
    });
    console.log(this.cutomerdata);
  }

}
