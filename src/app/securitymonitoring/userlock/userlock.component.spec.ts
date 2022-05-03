import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlockComponent } from './userlock.component';

describe('UserlockComponent', () => {
  let component: UserlockComponent;
  let fixture: ComponentFixture<UserlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
