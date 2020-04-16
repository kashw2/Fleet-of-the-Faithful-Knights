import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPageComponent } from './sso-page.component';

describe('SsoPageComponent', () => {
  let component: SsoPageComponent;
  let fixture: ComponentFixture<SsoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
