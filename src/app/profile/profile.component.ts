import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { UploadInput } from 'ngx-uploader';
import { AccountService } from './account.service';
import { Logger } from '@app/core';
import { Account } from '@app/core/models/account';
import { SharedAccountInfoService } from '@app/core/services/shared-account-info.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { musalaAnimations } from 'src/animations';
import { SubSink } from 'subsink';
import { UserDialogComponent } from '@app/shared/user-dialog/user-dialog.component';
import { Project } from '@app/core/models/project';
import { Subject } from 'rxjs';
import { ProjectDialogComponent } from '@app/shared/project-dialog/project-dialog.component';
import { Router } from '@angular/router';

const log = new Logger('Profile');
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: musalaAnimations
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;
  imageToSend: File;
  uploadInput: EventEmitter<UploadInput>;
  count = 0;
  dirtyImage = false;
  account: Account;
  subs = new SubSink();
  addedProject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private media: MediaObserver,
    private accountService: AccountService,
    private sharedAInfoService: SharedAccountInfoService,
    private storage: AngularFireStorage,
    private userDialog: MatDialog,
    private projectDialog: MatDialog,
    public router: Router
  ) {}
  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
  ngOnInit() {
    this.subs.sink = this.sharedAInfoService.getAccountObs().subscribe(data => {
      this.account = data;
    });
  }
  editProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.isMobile ? '320px' : '450px';
    dialogConfig.data = {
      account: this.account
    };
    const dialogRef = this.userDialog.open(UserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      log.debug(result);
      if (result) {
        this.sharedAInfoService.sendAccount(result);
      }
    });
  }

  onImageAdded(file: File) {
    const r = /.+\.(.+)$/.exec(file.name);
    const ext = r ? r[1] : '';
    const filePath = `avatars/${this.account.id}.${ext}`;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().subscribe({
      error: error => {
        log.error(error);
      },
      complete: () => {
        this.accountService.updateAccount(this.account.id, { avatarUrl: filePath }).subscribe(data => {
          this.sharedAInfoService.sendAccount(data);
        });
      }
    });
  }

  onImageRemoved() {
    this.accountService.updateAccount(this.account.id, { avatarUrl: null }).subscribe(data => {
      this.sharedAInfoService.sendAccount(data);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      project: null,
      accountId: this.account.id
    };
    const dialogRef = this.projectDialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addedProject.next(true);
      }
    });
  }
}
