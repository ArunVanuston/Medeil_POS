import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistRegComponent } from './pharmacist-reg.component';

describe('PharmacistRegComponent', () => {
  let component: PharmacistRegComponent;
  let fixture: ComponentFixture<PharmacistRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
