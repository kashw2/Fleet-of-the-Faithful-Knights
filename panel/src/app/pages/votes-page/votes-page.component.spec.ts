import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesPageComponent } from './votes-page.component';

describe('VotesPageComponent', () => {
  let component: VotesPageComponent;
  let fixture: ComponentFixture<VotesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
