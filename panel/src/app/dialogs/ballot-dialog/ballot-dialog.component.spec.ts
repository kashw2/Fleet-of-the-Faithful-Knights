import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotDialogComponent } from './ballot-dialog.component';

describe('BallotDialogComponent', () => {
  let component: BallotDialogComponent;
  let fixture: ComponentFixture<BallotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallotDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
