import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankreportComponent } from './bankreport.component';

describe('BankreportComponent', () => {
  let component: BankreportComponent;
  let fixture: ComponentFixture<BankreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
