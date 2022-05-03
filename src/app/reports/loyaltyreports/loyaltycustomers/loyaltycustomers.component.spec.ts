import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltycustomersComponent } from './loyaltycustomers.component';

describe('LoyaltycustomersComponent', () => {
  let component: LoyaltycustomersComponent;
  let fixture: ComponentFixture<LoyaltycustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltycustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltycustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
