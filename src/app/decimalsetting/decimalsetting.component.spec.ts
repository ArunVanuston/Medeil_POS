import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalsettingComponent } from './decimalsetting.component';

describe('DecimalsettingComponent', () => {
  let component: DecimalsettingComponent;
  let fixture: ComponentFixture<DecimalsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecimalsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecimalsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
