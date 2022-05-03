import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatreportsComponent } from './vatreports.component';

describe('VatreportsComponent', () => {
  let component: VatreportsComponent;
  let fixture: ComponentFixture<VatreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
