import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginhistoryComponent } from './userloginhistory.component';

describe('UserloginhistoryComponent', () => {
  let component: UserloginhistoryComponent;
  let fixture: ComponentFixture<UserloginhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
