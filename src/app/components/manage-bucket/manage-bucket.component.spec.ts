import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBucketComponent } from './manage-bucket.component';

describe('CreateBucketComponent', () => {
  let component: CreateBucketComponent;
  let fixture: ComponentFixture<CreateBucketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBucketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});