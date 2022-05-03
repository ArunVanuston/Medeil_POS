import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodulesComponent } from './submodules.component';

describe('SubmodulesComponent', () => {
  let component: SubmodulesComponent;
  let fixture: ComponentFixture<SubmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
