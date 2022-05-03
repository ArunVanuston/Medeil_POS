import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedmembershipsComponent } from './selectedmemberships.component';

describe('SelectedmembershipsComponent', () => {
  let component: SelectedmembershipsComponent;
  let fixture: ComponentFixture<SelectedmembershipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedmembershipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedmembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
