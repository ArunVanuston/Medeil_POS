import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistregreportComponent } from './pharmacistregreport.component';

describe('PharmacistregreportComponent', () => {
  let component: PharmacistregreportComponent;
  let fixture: ComponentFixture<PharmacistregreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistregreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistregreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
