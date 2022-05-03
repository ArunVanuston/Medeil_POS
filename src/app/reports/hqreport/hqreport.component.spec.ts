import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqreportComponent } from './hqreport.component';

describe('HqreportComponent', () => {
  let component: HqreportComponent;
  let fixture: ComponentFixture<HqreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
