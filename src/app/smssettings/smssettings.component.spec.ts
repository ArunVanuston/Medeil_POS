import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmssettingsComponent } from './smssettings.component';

describe('SmssettingsComponent', () => {
  let component: SmssettingsComponent;
  let fixture: ComponentFixture<SmssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
