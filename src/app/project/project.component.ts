import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '@app/projects/projects.service';
import { Project } from '@app/core/models/project';
import { SubSink } from 'subsink';
import { Account } from '@app/core/models/account';
import { SharedAccountInfoService } from '@app/core/services/shared-account-info.service';
import { musalaAnimations } from 'src/animations';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ProjectDialogComponent } from '@app/shared/project-dialog/project-dialog.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: musalaAnimations
})
export class ProjectComponent implements OnInit, OnDestroy {
  projectId: string;
  project: Project;
  account: Account;
  subs = new SubSink();
  owner: Account;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private sharedAInfoService: SharedAccountInfoService,
    private projectDialog: MatDialog,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.subs.sink = this.sharedAInfoService.getAccountObs().subscribe(data => {
      this.account = data;
    });
    this.route.params.subscribe(param => {
      if (param.id) {
        this.projectId = param.id;
        this.loadData();
      }
    });
  }
  editProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      project: this.project,
      accountId: this.account.id
    };
    const dialogRef = this.projectDialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
  askProject() {
    this.projectService.updateProject(this.projectId, { workedId: this.account.id }).subscribe(data => {
      this.loadData();
    });
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  private loadData() {
    this.projectService.getProject(this.projectId).subscribe(data => {
      this.project = data;
      this.owner = this.project.owner;
      this.getAvatarUrl();
      this.owner.avatarUrl = null;
    });
  }
  private getAvatarUrl() {
    const pattern = /^((http|https|ftp):\/\/)/;
    if (this.owner && this.owner.avatarUrl && !pattern.test(this.owner.avatarUrl)) {
      const fileRef = this.storage.ref(this.owner.avatarUrl);
      fileRef.getDownloadURL().subscribe(
        downloadURL => {
          this.owner.avatarUrl = downloadURL;
        },
        error => {
          this.owner.avatarUrl = null;
        }
      );
    }
  }
}
