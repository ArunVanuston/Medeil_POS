import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewshortexpiryComponent } from './viewshortexpiry.component';

describe('ViewshortexpiryComponent', () => {
  let component: ViewshortexpiryComponent;
  let fixture: ComponentFixture<ViewshortexpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewshortexpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewshortexpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
