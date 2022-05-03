import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhsncodeComponent } from './addhsncode.component';

describe('AddhsncodeComponent', () => {
  let component: AddhsncodeComponent;
  let fixture: ComponentFixture<AddhsncodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhsncodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhsncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
