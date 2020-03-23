import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectsService } from '@app/projects/projects.service';
import { Project } from '@app/core/models/project';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectDialogComponent } from '@app/shared/project-dialog/project-dialog.component';
import { finalize } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('Task Dialog');

interface DialogData {
  project: Project;
}
@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.scss']
})
export class TasksDialogComponent implements OnInit {
  projectForm: FormGroup;
  isLoading = false;
  constructor(
    private projectService: ProjectsService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.data.project) {
      this.projectForm.controls.completedTasks.setValue(this.data.project.completedTasks);
    }
  }
  save() {
    this.isLoading = true;
    this.projectService
      .updateProject(this.data.project.id, this.projectForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        data => {
          this.close(data);
        },
        error => {
          log.error(error);
          this.snackBar.open('Upps Something go wrong', '', {
            duration: 3000
          });
        }
      );
  }
  close(isSaved: any) {
    this.dialogRef.close(isSaved);
  }

  private createForm() {
    this.projectForm = this.formBuilder.group({
      completedTasks: [0]
    });
  }
}
