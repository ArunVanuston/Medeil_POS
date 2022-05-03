import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulerankingComponent } from './moduleranking.component';

describe('ModulerankingComponent', () => {
  let component: ModulerankingComponent;
  let fixture: ComponentFixture<ModulerankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulerankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulerankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
