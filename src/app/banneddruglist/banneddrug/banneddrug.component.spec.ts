import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneddrugComponent } from './banneddrug.component';

describe('BanneddrugComponent', () => {
  let component: BanneddrugComponent;
  let fixture: ComponentFixture<BanneddrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanneddrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanneddrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
