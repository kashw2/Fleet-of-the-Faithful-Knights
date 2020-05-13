import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteTabComponent } from './vote-tab.component';

describe('VoteTabComponent', () => {
  let component: VoteTabComponent;
  let fixture: ComponentFixture<VoteTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
