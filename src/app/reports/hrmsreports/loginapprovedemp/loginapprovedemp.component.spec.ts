import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginapprovedempComponent } from './loginapprovedemp.component';

describe('LoginapprovedempComponent', () => {
  let component: LoginapprovedempComponent;
  let fixture: ComponentFixture<LoginapprovedempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginapprovedempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginapprovedempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
