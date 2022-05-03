import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuwiseproductsComponent } from './manuwiseproducts.component';

describe('ManuwiseproductsComponent', () => {
  let component: ManuwiseproductsComponent;
  let fixture: ComponentFixture<ManuwiseproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuwiseproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuwiseproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
