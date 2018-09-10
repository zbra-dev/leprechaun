import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesListModalComponent } from './licenses-list-modal.component';

describe('LicensesListModalComponent', () => {
  let component: LicensesListModalComponent;
  let fixture: ComponentFixture<LicensesListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
