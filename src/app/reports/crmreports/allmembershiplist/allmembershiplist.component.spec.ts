import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmembershiplistComponent } from './allmembershiplist.component';

describe('AllmembershiplistComponent', () => {
  let component: AllmembershiplistComponent;
  let fixture: ComponentFixture<AllmembershiplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmembershiplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmembershiplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
