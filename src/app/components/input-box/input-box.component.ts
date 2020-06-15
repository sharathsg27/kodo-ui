import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit, OnDestroy, AfterViewInit {
  // Communication events
  @ViewChild('inputElement', {static: false }) inputElement: ElementRef;
  @Input('type') type: string;

  // Variables
  private inputValueSubscription: Subscription;
  value: string;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.checkForUserSearch();
  }

  ngAfterViewInit() {
    this.inputValueSubscription = fromEvent(this.inputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event: any) => event.target.value),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.value = value;
        // Set searched value in session storage to restore to state on page reload
        this.appService.setInSessionStorage('searchTerm', this.value);
        this.appService.searchValue(this.value);
      });
  }

  /**
   * Check if previous user search value from session storage & restore the state on page reload
   */
  checkForUserSearch = () => {
    const value = this.appService.getFromSessionStorage('searchTerm');
    if (value && value !== '') {
      this.value = value;
    }
  }

  ngOnDestroy() {
    this.inputValueSubscription.unsubscribe();
  }

}
