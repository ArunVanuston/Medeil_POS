import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgiftcardComponent } from './viewgiftcard.component';

describe('ViewgiftcardComponent', () => {
  let component: ViewgiftcardComponent;
  let fixture: ComponentFixture<ViewgiftcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgiftcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgiftcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
