import { Component, OnInit } from '@angular/core';
import { musalaAnimations } from 'src/animations';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
  animations: musalaAnimations
})
export class ErrorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
