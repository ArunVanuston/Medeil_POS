import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderrankingComponent } from './folderranking.component';

describe('FolderrankingComponent', () => {
  let component: FolderrankingComponent;
  let fixture: ComponentFixture<FolderrankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderrankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderrankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
