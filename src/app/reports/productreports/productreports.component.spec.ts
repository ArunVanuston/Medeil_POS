import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreportsComponent } from './productreports.component';

describe('ProductreportsComponent', () => {
  let component: ProductreportsComponent;
  let fixture: ComponentFixture<ProductreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
