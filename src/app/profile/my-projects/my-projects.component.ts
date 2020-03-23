import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Project } from '@app/core/models/project';
import { Subject, BehaviorSubject, Subscription, forkJoin, Observable } from 'rxjs';
import { AccountService } from '../account.service';
import { SubSink } from 'subsink';
import { FormControl } from '@angular/forms';
import { MatSort, MatDialogConfig, MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { musalaAnimations } from 'src/animations';
import { ProjectDialogComponent } from '@app/shared/project-dialog/project-dialog.component';
import { DialogOptions, DialogComponent } from '@app/shared/dialog/dialog.component';
import { Logger } from '@app/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProjectsService } from '@app/projects/projects.service';
import { Router } from '@angular/router';

const log = new Logger('My projects');

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss'],
  animations: musalaAnimations
})
export class MyProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() set accountId(value: string) {
    this.accountIdObs.next(value);
  }
  @Input() addedProject: Observable<boolean>;

  myProjects: Project[];
  fieldSort = '';
  searchTerm = new FormControl('');
  total = 0;
  page = 1;
  perPage = 10;
  showing = 0;
  resetPage: Subject<boolean> = new Subject<boolean>();
  subs = new SubSink();
  _accountId: string;
  displayedColumns: string[] = ['title', 'description', 'type', 'price', 'tasks', 'completedTasks', 'actions'];

  accountIdObs = new BehaviorSubject<string>('');

  constructor(
    private accountService: AccountService,
    private projectService: ProjectsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private projectDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.sink = this.accountIdObs.subscribe(value => {
      this._accountId = value;
      if (this._accountId) {
        this.loadData();
      }
    });
    this.subs.sink = this.addedProject.subscribe(data => {
      if (data) {
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
  editProject(project: Project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      project,
      accountId: this._accountId
    };
    const dialogRef = this.projectDialog.open(ProjectDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }
  deleteProject(projectId: string) {
    // dialog configuration object
    const config: DialogOptions = {
      content: 'Are you sure that you want to delete this project?',
      title: 'Delete Project'
    };
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.options = config;

    dialogRef.afterClosed().subscribe(value => {
      if (value === true) {
        // call the service
        this.projectService.deleteProject(projectId).subscribe(
          () => {
            this.loadData();
            log.debug('Project deleted succesfully.');
          },
          error => {
            log.error();
            this.snackBar.open('Upps Something go wrong.', '', {
              duration: 3000
            });
          }
        );
      }
    });
  }
  pageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.loadData();
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
    const subsGetMyprojects = this.accountService.getMyProjects(
      this._accountId,
      this.perPage,
      (this.page - 1) * this.perPage,
      this.searchTerm.value,
      this.fieldSort
    );
    request.push(subsGetMyprojects);
    const subsGetTotalMyProjects = this.accountService.getTotalMyProjects(this._accountId, this.searchTerm.value);
    request.push(subsGetTotalMyProjects);
    this.subs.sink = forkJoin(request).subscribe(
      responses => {
        if (responses.length === 1) {
          this.myProjects = responses[0];
        } else {
          if (responses.length === 2) {
            this.myProjects = responses[0];
            this.showing = this.myProjects.length;
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
