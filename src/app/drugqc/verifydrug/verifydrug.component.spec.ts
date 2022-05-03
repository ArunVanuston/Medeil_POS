import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifydrugComponent } from './verifydrug.component';

describe('VerifydrugComponent', () => {
  let component: VerifydrugComponent;
  let fixture: ComponentFixture<VerifydrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifydrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifydrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
