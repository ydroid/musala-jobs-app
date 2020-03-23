import { Component, Input, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input() showing: number;
  @Input() length: number;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 50, 100];
  @Input() showFirstAndLastBtns = true;
  @Input() showInfoText = true;
  @Input() resetPage: Observable<boolean>;
  pageSubs: Subscription;
  @Output() changeEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  elementsCount = 0;
  constructor(private media: MediaObserver) {
    this.elementsCount = this.pageSize;
  }

  ngOnInit() {
    this.pageSubs = this.resetPage.subscribe(data => {
      if (data) {
        this.paginator.firstPage();
      }
    });
  }
  onPage(event: PageEvent) {
    const count = (event.pageIndex + 1) * event.pageSize;
    if (count > this.length) {
      this.elementsCount = this.length;
    } else {
      this.elementsCount = count;
    }
    this.changeEvent.emit(event);
  }
  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
  ngOnDestroy() {
    this.pageSubs.unsubscribe();
  }
}
