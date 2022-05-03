import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardousprodlistComponent } from './hazardousprodlist.component';

describe('HazardousprodlistComponent', () => {
  let component: HazardousprodlistComponent;
  let fixture: ComponentFixture<HazardousprodlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HazardousprodlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardousprodlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
