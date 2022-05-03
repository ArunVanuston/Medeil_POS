import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcustypeComponent } from './viewcustype.component';

describe('ViewcustypeComponent', () => {
  let component: ViewcustypeComponent;
  let fixture: ComponentFixture<ViewcustypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcustypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcustypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
