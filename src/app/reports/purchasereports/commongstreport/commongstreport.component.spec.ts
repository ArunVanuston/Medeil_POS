import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommongstreportComponent } from './commongstreport.component';

describe('CommongstreportComponent', () => {
  let component: CommongstreportComponent;
  let fixture: ComponentFixture<CommongstreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommongstreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommongstreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
