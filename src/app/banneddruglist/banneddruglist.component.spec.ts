import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneddruglistComponent } from './banneddruglist.component';

describe('BanneddruglistComponent', () => {
  let component: BanneddruglistComponent;
  let fixture: ComponentFixture<BanneddruglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanneddruglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanneddruglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
