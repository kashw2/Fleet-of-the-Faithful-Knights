import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPanelComponent } from './special-panel.component';

describe('SpecialPanelComponent', () => {
  let component: SpecialPanelComponent;
  let fixture: ComponentFixture<SpecialPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
