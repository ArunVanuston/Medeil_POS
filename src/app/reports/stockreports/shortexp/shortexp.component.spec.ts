import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortexpComponent } from './shortexp.component';

describe('ShortexpComponent', () => {
  let component: ShortexpComponent;
  let fixture: ComponentFixture<ShortexpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortexpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
