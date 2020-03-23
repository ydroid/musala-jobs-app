import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSort, MatDialog, MatSnackBar, MatDialogConfig, PageEvent } from '@angular/material';
import { Account } from '@app/core/models/account';
import { AccountService } from '@app/profile/account.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { musalaAnimations } from 'src/animations';
import { DialogOptions, DialogComponent } from '@app/shared/dialog/dialog.component';
import { Logger } from '@app/core';
import { UserDialogComponent } from '../../shared/user-dialog/user-dialog.component';
import { Role } from '@app/core/models/role';
import { HelperService } from '@app/core/services/helper.service';
import { Subscription, forkJoin, Subject } from 'rxjs';

const log = new Logger('Users');
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: musalaAnimations
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  results: Account[];
  fieldSort = '';
  searchTerm = new FormControl('');
  total = 0;
  page = 1;
  perPage = 10;
  showing = 0;
  resetPage: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'actions'];
  roles: Role[];

  subsUser: Subscription;

  constructor(
    private media: MediaObserver,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userDialog: MatDialog,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.helperService.getRoles().subscribe(data => {
      this.roles = data;
    });
    this.loadData();
  }
  ngAfterViewInit() {
    this.listenEvents();
  }
  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
  resetFilters() {
    this.page = 1;
    this.searchTerm.setValue('');
    this.resetPage.next(true);
  }
  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.isMobile ? '320px' : '450px';
    dialogConfig.data = {
      account: null
    };
    const dialogRef = this.userDialog.open(UserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
  editUser(account: Account) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.isMobile ? '320px' : '450px';
    dialogConfig.data = {
      account
    };
    const dialogRef = this.userDialog.open(UserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
  deleteUser(accountId: string) {
    // dialog configuration object
    const config: DialogOptions = {
      content: 'Are you sure that you want to delete this user?',
      title: 'Delete User'
    };
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.options = config;

    dialogRef.afterClosed().subscribe(value => {
      if (value === true) {
        // call the service
        this.accountService.deleteAccount(accountId).subscribe(
          () => {
            this.loadData();
            log.debug('User deleted succesfully.');
          },
          error => {
            log.error();
            this.snackBar.open('Upps Something go wrong', '', {
              duration: 3000
            });
          }
        );
      }
    });
  }
  updateRole(account: Account, roleId: string) {
    this.accountService.updateRole(account.id, roleId).subscribe(
      () => {
        this.loadData();
      },
      error => {
        this.snackBar.open(error, '', { duration: 2000 });
      }
    );
  }
  pageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadData();
  }

  ngOnDestroy() {
    this.subsUser.unsubscribe();
  }
  private listenEvents() {
    this.sort.sortChange.subscribe((value: any) => {
      this.page = 1;
      this.resetPage.next(true);
      this.fieldSort = value.active + ' ' + value.direction;
      this.loadData();
    });
    this.searchTerm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => {
      this.page = 1;
      this.resetPage.next(true);
      this.loadData();
    });
  }

  private loadData() {
    const request = [];
    const subsGetAccounts = this.accountService.getAccounts(
      this.perPage,
      (this.page - 1) * this.perPage,
      this.searchTerm.value,
      this.fieldSort
    );
    request.push(subsGetAccounts);
    const subsGetTotalAccounts = this.accountService.getTotalAccounts(this.searchTerm.value);
    request.push(subsGetTotalAccounts);
    this.subsUser = forkJoin(request).subscribe(
      responses => {
        if (responses.length === 1) {
          this.results = responses[0];
        } else {
          if (responses.length === 2) {
            this.results = responses[0];
            this.showing = this.results.length;
            this.total = responses[1].count;
          }
        }
      },
      error => {
        log.error(error);
      }
    );
  }
}
