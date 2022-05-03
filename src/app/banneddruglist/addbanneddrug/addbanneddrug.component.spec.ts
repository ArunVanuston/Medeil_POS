import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbanneddrugComponent } from './addbanneddrug.component';

describe('AddbanneddrugComponent', () => {
  let component: AddbanneddrugComponent;
  let fixture: ComponentFixture<AddbanneddrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbanneddrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbanneddrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
