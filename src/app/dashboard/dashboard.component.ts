import { Component, OnInit } from '@angular/core';
import { musalaAnimations } from 'src/animations';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ProjectDialogComponent } from '@app/shared/project-dialog/project-dialog.component';
import { CredentialsService } from '@app/core';
import { ProjectsService } from '@app/projects/projects.service';
import { Project } from '@app/core/models/project';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: musalaAnimations
})
export class DashboardComponent implements OnInit {
  projects: Project[];
  searchTerm = new FormControl('');
  fieldSort = '';
  total = 0;
  page = 1;
  perPage = 10;
  showing = 0;
  constructor(
    private projectDialog: MatDialog,
    private credentialsService: CredentialsService,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      project: null,
      accountId: this.credentialsService.credentials.id
    };
    const dialogRef = this.projectDialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
  resetFilters() {
    this.searchTerm.setValue('');
    this.loadData();
  }
  public loadData() {
    this.projectService
      .getProjects(this.perPage, (this.page - 1) * this.perPage, this.searchTerm.value, this.fieldSort)
      .subscribe(data => {
        this.projects = data;
      });
  }
}
