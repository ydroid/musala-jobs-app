import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDialogComponent } from './tasks-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../material.module';

describe('TasksDialogComponent', () => {
  let component: TasksDialogComponent;
  let fixture: ComponentFixture<TasksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        FlexLayoutModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [TasksDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
