import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseregisterComponent } from './closeregister.component';

describe('CloseregisterComponent', () => {
  let component: CloseregisterComponent;
  let fixture: ComponentFixture<CloseregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
