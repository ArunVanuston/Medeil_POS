import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortexpirysettingsComponent } from './shortexpirysettings.component';

describe('ShortexpirysettingsComponent', () => {
  let component: ShortexpirysettingsComponent;
  let fixture: ComponentFixture<ShortexpirysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortexpirysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortexpirysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
