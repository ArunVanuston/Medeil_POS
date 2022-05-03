import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractisemgmntComponent } from './practisemgmnt.component';

describe('PractisemgmntComponent', () => {
  let component: PractisemgmntComponent;
  let fixture: ComponentFixture<PractisemgmntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractisemgmntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractisemgmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
