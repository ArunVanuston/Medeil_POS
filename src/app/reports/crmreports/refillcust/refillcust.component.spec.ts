import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillcustComponent } from './refillcust.component';

describe('RefillcustComponent', () => {
  let component: RefillcustComponent;
  let fixture: ComponentFixture<RefillcustComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefillcustComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillcustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
