import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesjournalComponent } from './salesjournal.component';

describe('SalesjournalComponent', () => {
  let component: SalesjournalComponent;
  let fixture: ComponentFixture<SalesjournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesjournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesjournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
