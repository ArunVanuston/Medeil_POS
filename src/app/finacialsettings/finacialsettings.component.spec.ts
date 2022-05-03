import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinacialsettingsComponent } from './finacialsettings.component';

describe('FinacialsettingsComponent', () => {
  let component: FinacialsettingsComponent;
  let fixture: ComponentFixture<FinacialsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinacialsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinacialsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
