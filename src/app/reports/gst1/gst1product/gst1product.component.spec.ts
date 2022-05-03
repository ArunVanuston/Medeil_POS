import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gst1productComponent } from './gst1product.component';

describe('Gst1productComponent', () => {
  let component: Gst1productComponent;
  let fixture: ComponentFixture<Gst1productComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gst1productComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gst1productComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
