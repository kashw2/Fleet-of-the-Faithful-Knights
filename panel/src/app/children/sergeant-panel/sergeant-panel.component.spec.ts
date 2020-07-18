import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SergeantPanelComponent } from './sergeant-panel.component';

describe('SergeantPanelComponent', () => {
  let component: SergeantPanelComponent;
  let fixture: ComponentFixture<SergeantPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SergeantPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SergeantPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
