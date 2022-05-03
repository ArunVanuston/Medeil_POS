import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertaskdetailsComponent } from './usertaskdetails.component';

describe('UsertaskdetailsComponent', () => {
  let component: UsertaskdetailsComponent;
  let fixture: ComponentFixture<UsertaskdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertaskdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertaskdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
