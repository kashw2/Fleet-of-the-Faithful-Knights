import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoteModalComponent } from './create-vote-modal.component';

describe('CreateVoteModalComponent', () => {
  let component: CreateVoteModalComponent;
  let fixture: ComponentFixture<CreateVoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
