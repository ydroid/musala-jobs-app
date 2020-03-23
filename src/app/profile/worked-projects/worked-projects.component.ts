import { Component, OnInit, ViewChild, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { MatSort, PageEvent, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { Observable, Subject, BehaviorSubject, forkJoin } from 'rxjs';
import { Project } from '@app/core/models/project';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccountService } from '../account.service';
import { ProjectsService } from '@app/projects/projects.service';
import { Logger } from '@app/core';
import { musalaAnimations } from 'src/animations';
import { TasksDialogComponent } from './tasks-dialog/tasks-dialog.component';
import { Router } from '@angular/router';

const log = new Logger('Worked projects');

@Component({
  selector: 'app-worked-projects',
  templateUrl: './worked-projects.component.html',
  styleUrls: ['./worked-projects.component.scss'],
  animations: musalaAnimations
})
export class WorkedProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() set accountId(value: string) {
    this.accountIdObs.next(value);
  }
  workedProjects: Project[];
  fieldSort = '';
  searchTerm = new FormControl('');
  total = 0;
  page = 1;
  perPage = 10;
  showing = 0;
  resetPage: Subject<boolean> = new Subject<boolean>();
  subs = new SubSink();
  _accountId: string;
  displayedColumns: string[] = ['title', 'tasks', 'completedTasks'];

  private accountIdObs = new BehaviorSubject<string>('');

  constructor(private accountService: AccountService, private taskDialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.subs.sink = this.accountIdObs.subscribe(value => {
      this._accountId = value;
      if (this._accountId) {
        this.loadData();
      }
    });
  }
  projectDetails(id: string) {
    this.router.navigate(['/project/' + id]);
  }
  ngAfterViewInit() {
    this.listenEvents();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  resetFilters() {
    this.page = 1;
    this.searchTerm.setValue('');
    this.resetPage.next(true);
  }
  pageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadData();
  }
  editTask(project: Project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      project,
      accountId: this._accountId
    };
    const dialogRef = this.taskDialog.open(TasksDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
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
    const subsGetAccounts = this.accountService.getWorkedProjects(
      this._accountId,
      this.perPage,
      (this.page - 1) * this.perPage,
      this.searchTerm.value,
      this.fieldSort
    );
    request.push(subsGetAccounts);
    const subsGetTotalAccounts = this.accountService.getTotalWorkedProjects(this._accountId, this.searchTerm.value);
    request.push(subsGetTotalAccounts);
    this.subs.sink = forkJoin(request).subscribe(
      responses => {
        if (responses.length === 1) {
          this.workedProjects = responses[0];
        } else {
          if (responses.length === 2) {
            this.workedProjects = responses[0];
            this.showing = this.workedProjects.length;
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
