import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';

describe('UploadService', () => {
  let component: UploadService;
  let fixture: ComponentFixture<UploadService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
