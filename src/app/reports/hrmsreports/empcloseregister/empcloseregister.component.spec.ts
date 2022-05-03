import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpcloseregisterComponent } from './empcloseregister.component';

describe('EmpcloseregisterComponent', () => {
  let component: EmpcloseregisterComponent;
  let fixture: ComponentFixture<EmpcloseregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpcloseregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpcloseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
