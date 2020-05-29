import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContainerComponent } from './post-container.component';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let fixture: ComponentFixture<PostContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
