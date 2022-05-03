import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangenriclistComponent } from './bangenriclist.component';

describe('BangenriclistComponent', () => {
  let component: BangenriclistComponent;
  let fixture: ComponentFixture<BangenriclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangenriclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangenriclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
