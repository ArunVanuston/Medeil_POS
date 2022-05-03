import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpurchasedeliverychallanComponent } from './newpurchasedeliverychallan.component';

describe('NewpurchasedeliverychallanComponent', () => {
  let component: NewpurchasedeliverychallanComponent;
  let fixture: ComponentFixture<NewpurchasedeliverychallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpurchasedeliverychallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpurchasedeliverychallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
