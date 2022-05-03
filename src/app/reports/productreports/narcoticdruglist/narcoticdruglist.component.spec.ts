import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NarcoticdruglistComponent } from './narcoticdruglist.component';

describe('NarcoticdruglistComponent', () => {
  let component: NarcoticdruglistComponent;
  let fixture: ComponentFixture<NarcoticdruglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NarcoticdruglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NarcoticdruglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
