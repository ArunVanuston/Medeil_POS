import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HsncodeComponent } from './hsncode.component';

describe('HsncodeComponent', () => {
  let component: HsncodeComponent;
  let fixture: ComponentFixture<HsncodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HsncodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HsncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
