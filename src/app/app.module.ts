import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {MatTableModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {DateInLineComponent} from './date-in-line/date-in-line.component';
import {DayPickerComponent} from './day-picker/day-picker.component';
import {MonthPickerComponent} from './month-picker/month-picker.component';
import {YearPickerComponent} from './year-picker/year-picker.component';
import {TestingComponent} from './testing/testing.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TestingComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'test',
    component: TestingComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    DateInLineComponent,
    MonthPickerComponent,
    YearPickerComponent,
    TestingComponent,
    DayPickerComponent,
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpModule,
    MatTableModule,
    MatInputModule,
    NgbModule.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
