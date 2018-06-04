import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDialogComponent } from './remove-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormValidatorsService } from '../../core/form/form-validators.service';

describe('RemoveDialogComponent', () => {
  let component: RemoveDialogComponent;
  let fixture: ComponentFixture<RemoveDialogComponent>;
  let matDialogRef: MatDialogRef<RemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        RemoveDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
