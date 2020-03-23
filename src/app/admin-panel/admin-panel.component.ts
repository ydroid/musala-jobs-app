import { Component, OnInit } from '@angular/core';
import { musalaAnimations } from 'src/animations';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  animations: musalaAnimations
})
export class AdminPanelComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
