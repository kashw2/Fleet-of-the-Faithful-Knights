import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperPanelComponent } from './developer-panel.component';

describe('DeveloperPanelComponent', () => {
  let component: DeveloperPanelComponent;
  let fixture: ComponentFixture<DeveloperPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
