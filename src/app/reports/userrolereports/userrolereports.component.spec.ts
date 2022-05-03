import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrolereportsComponent } from './userrolereports.component';

describe('UserrolereportsComponent', () => {
  let component: UserrolereportsComponent;
  let fixture: ComponentFixture<UserrolereportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrolereportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrolereportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
