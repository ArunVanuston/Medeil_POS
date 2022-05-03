import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpasshistoryComponent } from './userpasshistory.component';

describe('UserpasshistoryComponent', () => {
  let component: UserpasshistoryComponent;
  let fixture: ComponentFixture<UserpasshistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpasshistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpasshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
