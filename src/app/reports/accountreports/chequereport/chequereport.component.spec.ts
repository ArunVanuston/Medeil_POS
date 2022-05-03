import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequereportComponent } from './chequereport.component';

describe('ChequereportComponent', () => {
  let component: ChequereportComponent;
  let fixture: ComponentFixture<ChequereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
