import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcreportComponent } from './dcreport.component';

describe('DcreportComponent', () => {
  let component: DcreportComponent;
  let fixture: ComponentFixture<DcreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
