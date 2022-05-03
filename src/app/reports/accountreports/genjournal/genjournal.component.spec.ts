import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenjournalComponent } from './genjournal.component';

describe('GenjournalComponent', () => {
  let component: GenjournalComponent;
  let fixture: ComponentFixture<GenjournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenjournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenjournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
