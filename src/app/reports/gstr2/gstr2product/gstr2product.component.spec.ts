import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gstr2productComponent } from './gstr2product.component';

describe('Gstr2productComponent', () => {
  let component: Gstr2productComponent;
  let fixture: ComponentFixture<Gstr2productComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gstr2productComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gstr2productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
