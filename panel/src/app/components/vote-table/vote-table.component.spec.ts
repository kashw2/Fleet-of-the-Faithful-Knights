import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteTableComponent } from './vote-table.component';

describe('VoteTableComponent', () => {
  let component: VoteTableComponent;
  let fixture: ComponentFixture<VoteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
