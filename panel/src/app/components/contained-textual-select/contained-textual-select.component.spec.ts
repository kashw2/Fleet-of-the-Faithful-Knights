import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainedTextualSelectComponent } from './contained-textual-select.component';

describe('ContainedTextualSelectComponent', () => {
  let component: ContainedTextualSelectComponent;
  let fixture: ComponentFixture<ContainedTextualSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainedTextualSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainedTextualSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
