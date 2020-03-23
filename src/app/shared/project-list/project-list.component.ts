import { Component, OnInit, Input } from '@angular/core';
import { Project } from '@app/core/models/project';
import { musalaAnimations } from 'src/animations';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: musalaAnimations
})
export class ProjectListComponent implements OnInit {
  @Input() projectList: Project[];
  @Input() align: string;
  @Input() projectsAlign: string;
  constructor() {}

  ngOnInit() {}
}
