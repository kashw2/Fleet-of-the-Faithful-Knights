import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPanelPageComponent } from './voting-panel-page.component';

describe('VotingPanelPageComponent', () => {
  let component: VotingPanelPageComponent;
  let fixture: ComponentFixture<VotingPanelPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingPanelPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPanelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
