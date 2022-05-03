import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpointsComponent } from './customerpoints.component';

describe('CustomerpointsComponent', () => {
  let component: CustomerpointsComponent;
  let fixture: ComponentFixture<CustomerpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
