import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBlobComponent } from './manage-blob.component';

describe('ManageBlobComponent', () => {
  let component: ManageBlobComponent;
  let fixture: ComponentFixture<ManageBlobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBlobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
