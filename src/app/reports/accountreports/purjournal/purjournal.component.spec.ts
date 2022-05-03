import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurjournalComponent } from './purjournal.component';

describe('PurjournalComponent', () => {
  let component: PurjournalComponent;
  let fixture: ComponentFixture<PurjournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurjournalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurjournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
