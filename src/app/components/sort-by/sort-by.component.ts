import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  @Input('sortOptions') sortOptions: any[];
  selectedValue: string = '';

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.checkForUserSort();
  }

  /**
   * Set selected value & store in session storage
   */
  setSelectedValue = () => {
    this.appService.setInSessionStorage('sortField', this.selectedValue);
    this.appService.updatedSelectedDropDown(this.selectedValue);
  }

  /**
   * Check if previous user sort value from session storage & restore the state on page reload
   */
  checkForUserSort = () => {
    const value = this.appService.getFromSessionStorage('sortField');
    if (value && value !== '') {
      this.selectedValue = value;
      this.appService.updatedSelectedDropDown(this.selectedValue);
    }
  }

}
