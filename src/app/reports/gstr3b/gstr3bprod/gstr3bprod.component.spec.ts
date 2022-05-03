import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gstr3bprodComponent } from './gstr3bprod.component';

describe('Gstr3bprodComponent', () => {
  let component: Gstr3bprodComponent;
  let fixture: ComponentFixture<Gstr3bprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gstr3bprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gstr3bprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
