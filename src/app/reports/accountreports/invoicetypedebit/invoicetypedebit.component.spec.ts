import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicetypedebitComponent } from './invoicetypedebit.component';

describe('InvoicetypedebitComponent', () => {
  let component: InvoicetypedebitComponent;
  let fixture: ComponentFixture<InvoicetypedebitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicetypedebitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicetypedebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
