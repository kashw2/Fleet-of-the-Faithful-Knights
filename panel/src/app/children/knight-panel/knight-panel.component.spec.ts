import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnightPanelComponent } from './knight-panel.component';

describe('KnightPanelComponent', () => {
  let component: KnightPanelComponent;
  let fixture: ComponentFixture<KnightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
