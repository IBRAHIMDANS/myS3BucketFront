import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlobComponent } from './add-blob.component';

describe('AddBlobComponent', () => {
  let component: AddBlobComponent;
  let fixture: ComponentFixture<AddBlobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBlobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
