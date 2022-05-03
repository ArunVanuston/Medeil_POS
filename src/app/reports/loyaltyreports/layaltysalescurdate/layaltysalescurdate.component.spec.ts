import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayaltysalescurdateComponent } from './layaltysalescurdate.component';

describe('LayaltysalescurdateComponent', () => {
  let component: LayaltysalescurdateComponent;
  let fixture: ComponentFixture<LayaltysalescurdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayaltysalescurdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayaltysalescurdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
