import { Component, OnInit } from '@angular/core';
import { Project } from '@app/core/models/project';
import { ProjectsService } from './projects.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { musalaAnimations } from 'src/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: musalaAnimations
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  searchTerm = new FormControl('');
  fieldSort = '';
  total = 0;
  page = 1;
  perPage = 10;
  showing = 0;

  constructor(private projectsService: ProjectsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.q) {
        this.searchTerm.setValue(params.q);
      }
      this.search();
    });
  }

  public reSearch() {
    this.router.navigate(['/projects'], { queryParams: { q: this.searchTerm.value } });
  }

  private search() {
    this.projectsService
      .getProjects(this.perPage, (this.page - 1) * this.perPage, this.searchTerm.value, this.fieldSort)
      .subscribe(data => {
        this.projects = data;
      });
  }
}
