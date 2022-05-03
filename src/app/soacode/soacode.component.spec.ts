import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoacodeComponent } from './soacode.component';

describe('SoacodeComponent', () => {
  let component: SoacodeComponent;
  let fixture: ComponentFixture<SoacodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoacodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoacodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
