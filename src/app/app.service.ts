import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EfilePath} from './enums/EfilePath';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  // Observable string sources
  private dropdownSource = new Subject<string>();
  private searchTermSource = new Subject<string>();

  // Observable string streams
  dropDownSelected$ = this.dropdownSource.asObservable();
  searchTermEntered$ = this.searchTermSource.asObservable();

  /**
   * Get JSON info
   */
  getJSONData = (): Observable<any> => this.http.get(EfilePath.FEED_DATA);

  /**
   * Sort by fields
   * @param list
   * @param fieldToCompare
   */
  sortByField = (list: any[] = [], fieldToCompare: string = '') => {
    if (list.length < 1) return [];
    return list.sort( (a, b) => a[fieldToCompare].localeCompare(b[fieldToCompare], 'en', {sensitivity: 'base'}));
  }

  /**
   * Communicate updated dropdown value
   * @param mission
   */
  updatedSelectedDropDown(mission: any) {
    this.dropdownSource.next(mission);
  }

  /**
   * Search items based on multiple key parameters
   * @param {string} searchTerm
   * @param {Array} items
   * @param keys
   */
  searchItems = (searchTerm: string, items: any[], keys: any[]) => {
    const quotePatten =  /".*?"/g;
    const words  = searchTerm.toLowerCase().split(' ');
    let matchType = '';
    if (quotePatten.test(searchTerm)) {
      searchTerm = searchTerm.trim().substring(1, searchTerm.length - 1);
      matchType = 'exact';
    }
    return (items || [])
      .filter(item => keys
      .find(key => {
        const normalizedTerm = item[key].toLowerCase();
        if (matchType === 'exact') {
          return normalizedTerm === searchTerm.toLowerCase();
        } else { return words.some(word => normalizedTerm.includes(word)); }
      }));
  };

  /**
   * Emit search value for all the subscribers
   * @param {string} value
   */
  searchValue = (value: string) => {
    this.searchTermSource.next(value);
  };

  /**
   * Set value in session storage
   * @param key
   * @param value
   */
  setInSessionStorage = (key: string, value: string) => {
    if (value !== '') sessionStorage[key] = value;
    else sessionStorage.removeItem(key);
  }

  /**
   * Get value from session storage
   * @param key
   */
  getFromSessionStorage = (key: string) => {
    return sessionStorage[key];
  }
}

