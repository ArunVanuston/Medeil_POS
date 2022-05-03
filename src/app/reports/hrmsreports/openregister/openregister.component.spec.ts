import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenregisterComponent } from './openregister.component';

describe('OpenregisterComponent', () => {
  let component: OpenregisterComponent;
  let fixture: ComponentFixture<OpenregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
