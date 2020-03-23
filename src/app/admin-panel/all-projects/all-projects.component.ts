import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatSnackBar, MatDialog, MatDialogConfig, PageEvent } from '@angular/material';
import { Observable, Subject, forkJoin } from 'rxjs';
import { Project } from '@app/core/models/project';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { ProjectsService } from '@app/projects/projects.service';
import { Router } from '@angular/router';
import { ProjectDialogComponent } from '@app/shared/project-dialog/project-dialog.component';
import { DialogOptions, DialogComponent } from '@app/shared/dialog/dialog.component';
import { Logger, CredentialsService } from '@app/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { musalaAnimations } from 'src/animations';

const log = new Logger('Admin panel projects');
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss'],
  animations: musalaAnimations
})
export class AllProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  projects: Project[];
  fieldSort = '';
  searchTerm = new FormControl('');
  total = 0;
  page = 1;
  perPage = 10;
  showing = 0;
  resetPage: Subject<boolean> = new Subject<boolean>();
  subs = new SubSink();
  displayedColumns: string[] = ['title', 'description', 'type', 'price', 'tasks', 'completedTasks', 'actions'];

  constructor(
    private projectService: ProjectsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private projectDialog: MatDialog,
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    this.loadData();
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
  editProject(project: Project) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      project,
      accountId: this.credentialsService.credentials.id
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
    const subsGetAccounts = this.projectService.getAllProjects(
      this.perPage,
      (this.page - 1) * this.perPage,
      this.searchTerm.value,
      this.fieldSort
    );
    request.push(subsGetAccounts);
    const subsGetTotalAccounts = this.projectService.getTotalAllProjects(this.searchTerm.value);
    request.push(subsGetTotalAccounts);
    this.subs.sink = forkJoin(request).subscribe(
      responses => {
        if (responses.length === 1) {
          this.projects = responses[0];
        } else {
          if (responses.length === 2) {
            this.projects = responses[0];
            this.showing = this.projects.length;
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
