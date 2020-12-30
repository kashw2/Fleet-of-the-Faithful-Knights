import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColouredTextComponent } from './coloured-text.component';

describe('ColouredTextComponent', () => {
  let component: ColouredTextComponent;
  let fixture: ComponentFixture<ColouredTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColouredTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColouredTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
