import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanustondocComponent } from './vanustondoc.component';

describe('VanustondocComponent', () => {
  let component: VanustondocComponent;
  let fixture: ComponentFixture<VanustondocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanustondocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanustondocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
