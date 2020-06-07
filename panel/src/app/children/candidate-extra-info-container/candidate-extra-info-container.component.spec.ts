import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateExtraInfoContainerComponent } from './candidate-extra-info-container.component';

describe('CandidateExtraInfoContainerComponent', () => {
  let component: CandidateExtraInfoContainerComponent;
  let fixture: ComponentFixture<CandidateExtraInfoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateExtraInfoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateExtraInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
