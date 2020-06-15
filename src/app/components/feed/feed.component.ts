import {AfterContentChecked, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterContentChecked, OnDestroy {
  feeds: any[];
  feedData: any[];
  sortField: string;
  sortOptions: any[];
  feedsSubscription: Subscription;
  @Input('hasRecords') hasRecords: boolean;

  constructor(private appService: AppService,
              private cdRef: ChangeDetectorRef) {
    this.appService.dropDownSelected$.subscribe(selectedDropDownValue => {
      this.sortField = selectedDropDownValue;
      if (this.sortField !== '') this.feeds = this.appService.sortByField(this.feeds, this.sortField);
    });
    this.appService.searchTermEntered$.subscribe(value => {
      this.feeds = this.onSearch(value);
    });
  }

  ngOnInit() {
    this.getFeedInfo();
    this.sortOptions = [{ key: 'name', displayName: 'Name'}, { key: 'dateLastEdited', displayName: 'Last updated'}];
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  /**
   * On search of feed info
   * @param searchTerm
   */
  onSearch = (searchTerm: string) => {
    const keys = ['name', 'description'];
    return this.appService.searchItems(searchTerm, this.feedData, keys);
  }

  /**
   * Fetch feed info data
   */
  getFeedInfo = () => {
    this.feedsSubscription = this.appService.getJSONData().subscribe(feeds => {
      this.feeds = feeds;
      this.feedData = feeds;
    });
  }

  /**
   * update items on change
   * @param {Array} items
   */
  updateItems = (items: any[]) => {
    this.feeds = items;
  };

  /**
   * Check if feed records exists on search value
   * @param hasRecords
   */
  checkRecords = (hasRecords) => {
    this.hasRecords = hasRecords;
  }

  ngOnDestroy() {
    this.feedsSubscription.unsubscribe();
  }

}
