import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalproductsreportComponent } from './disposalproductsreport.component';

describe('DisposalproductsreportComponent', () => {
  let component: DisposalproductsreportComponent;
  let fixture: ComponentFixture<DisposalproductsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposalproductsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposalproductsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
