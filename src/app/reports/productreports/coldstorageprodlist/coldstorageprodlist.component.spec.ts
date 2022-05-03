import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdstorageprodlistComponent } from './coldstorageprodlist.component';

describe('ColdstorageprodlistComponent', () => {
  let component: ColdstorageprodlistComponent;
  let fixture: ComponentFixture<ColdstorageprodlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColdstorageprodlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdstorageprodlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
