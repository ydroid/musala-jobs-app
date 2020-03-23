import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Project } from '@app/core/models/project';
import { ProjectsService } from '@app/projects/projects.service';
import { Logger } from '@app/core';
import { finalize } from 'rxjs/operators';
import { HelperService } from '@app/core/services/helper.service';
import { ProjectType } from '@app/core/models/projectType';

const log = new Logger('Project Dialog');
interface DialogData {
  project: Project;
  accountId: string;
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {
  projectForm: FormGroup;
  isLoading = false;
  projectTypes: ProjectType[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService,
    private snackBar: MatSnackBar,
    private helperService: HelperService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }
  save() {
    this.data.project === null ? this.addProject() : this.updateProject();
  }
  addProject() {
    this.projectService.addProject(this.projectForm.value).subscribe(
      data => {
        this.close(data);
      },
      error => {
        log.error(error);
        this.snackBar.open('Upps Something go wrong', '', { duration: 3000 });
      }
    );
  }
  updateProject() {
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
  private loadData() {
    this.helperService.getProjectTypes().subscribe(data => {
      this.projectTypes = data;
    });
    if (this.data.project) {
      this.projectForm.controls.title.setValue(this.data.project.title);
      this.projectForm.controls.description.setValue(this.data.project.description);
      this.projectForm.controls.price.setValue(this.data.project.price);
      this.projectForm.controls.ownerId.setValue(this.data.project.ownerId);
      this.projectForm.controls.completedTasks.setValue(this.data.project.completedTasks);
      this.projectForm.controls.tasks.setValue(this.data.project.tasks);
      this.projectForm.controls.projectTypeId.setValue(this.data.project.projectTypeId);
    }
  }
  private createForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', Validators.required],
      price: [0],
      projectTypeId: [null, Validators.required],
      tasks: [0],
      completedTasks: [0],
      ownerId: [this.data.accountId]
    });
  }
}
