import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenaccesstimeComponent } from './tokenaccesstime.component';

describe('TokenaccesstimeComponent', () => {
  let component: TokenaccesstimeComponent;
  let fixture: ComponentFixture<TokenaccesstimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenaccesstimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenaccesstimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
