import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingreportsComponent } from './pickingreports.component';

describe('PickingreportsComponent', () => {
  let component: PickingreportsComponent;
  let fixture: ComponentFixture<PickingreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickingreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
