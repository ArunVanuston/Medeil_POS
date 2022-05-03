import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupcostsettingsComponent } from './setupcostsettings.component';

describe('SetupcostsettingsComponent', () => {
  let component: SetupcostsettingsComponent;
  let fixture: ComponentFixture<SetupcostsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupcostsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupcostsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
