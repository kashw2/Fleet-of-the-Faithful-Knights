import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login.PageComponent } from './login.page.component';

describe('Login.PageComponent', () => {
  let component: Login.PageComponent;
  let fixture: ComponentFixture<Login.PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login.PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
