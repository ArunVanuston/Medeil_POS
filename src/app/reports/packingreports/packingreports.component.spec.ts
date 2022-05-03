import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingreportsComponent } from './packingreports.component';

describe('PackingreportsComponent', () => {
  let component: PackingreportsComponent;
  let fixture: ComponentFixture<PackingreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
