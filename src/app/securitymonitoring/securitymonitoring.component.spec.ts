import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritymonitoringComponent } from './securitymonitoring.component';

describe('SecuritymonitoringComponent', () => {
  let component: SecuritymonitoringComponent;
  let fixture: ComponentFixture<SecuritymonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritymonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritymonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
