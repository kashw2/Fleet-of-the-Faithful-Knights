import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNewsContainerComponent } from './profile-news-container.component';

describe('ProfileNewsContainerComponent', () => {
  let component: ProfileNewsContainerComponent;
  let fixture: ComponentFixture<ProfileNewsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNewsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNewsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
