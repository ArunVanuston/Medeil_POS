import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddamagestockComponent } from './adddamagestock.component';

describe('AdddamagestockComponent', () => {
  let component: AdddamagestockComponent;
  let fixture: ComponentFixture<AdddamagestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddamagestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddamagestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
