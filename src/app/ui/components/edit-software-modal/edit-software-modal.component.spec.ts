import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoftwareModalComponent } from './edit-software-modal.component';

describe('EditSoftwareModalComponent', () => {
  let component: EditSoftwareModalComponent;
  let fixture: ComponentFixture<EditSoftwareModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSoftwareModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoftwareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
