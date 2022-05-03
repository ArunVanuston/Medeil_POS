import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortexpiryComponent } from './shortexpiry.component';

describe('ShortexpiryComponent', () => {
  let component: ShortexpiryComponent;
  let fixture: ComponentFixture<ShortexpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortexpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortexpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
