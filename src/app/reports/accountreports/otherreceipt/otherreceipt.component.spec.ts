import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherreceiptComponent } from './otherreceipt.component';

describe('OtherreceiptComponent', () => {
  let component: OtherreceiptComponent;
  let fixture: ComponentFixture<OtherreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
