import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInLineComponent } from './date-in-line.component';

describe('DateInLineComponent', () => {
  let component: DateInLineComponent;
  let fixture: ComponentFixture<DateInLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateInLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
