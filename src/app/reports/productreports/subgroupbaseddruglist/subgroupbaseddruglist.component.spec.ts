import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupbaseddruglistComponent } from './subgroupbaseddruglist.component';

describe('SubgroupbaseddruglistComponent', () => {
  let component: SubgroupbaseddruglistComponent;
  let fixture: ComponentFixture<SubgroupbaseddruglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgroupbaseddruglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupbaseddruglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
