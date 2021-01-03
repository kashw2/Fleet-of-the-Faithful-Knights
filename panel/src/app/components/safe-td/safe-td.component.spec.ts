import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeTdComponent } from './safe-td.component';

describe('SafeTdComponent', () => {
  let component: SafeTdComponent;
  let fixture: ComponentFixture<SafeTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeTdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
