import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVoteModalComponent } from './view-vote-modal.component';

describe('ViewVoteModalComponent', () => {
  let component: ViewVoteModalComponent;
  let fixture: ComponentFixture<ViewVoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
