import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppService', () => {
  let service: AppService;
  const feedList = [
    {
      name: 'Customer Assurance Liaison',
      image: 'http://lorempixel.com/640/480',
      description: 'Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.',
      dateLastEdited: '2018-05-19T12:33:25.545Z'
    },
    {
      name: 'Customer Branding Officer',
      image: 'http://lorempixel.com/640/480',
      description: 'Facere vel delectus. Quia quae veniam autem sapiente non nihil aut distinctio voluptatem. Dolorum optio earum ut. Qui illum ullam itaque qui vero cupiditate. Sunt et voluptas. Quidem autem est qui hic exercitationem.',
      dateLastEdited: '2017-11-24T04:58:39.686Z'
    },
    {
      name: 'Customer Creative Executive',
      image: 'http://lorempixel.com/640/480',
      description: 'Saepe vel et reprehenderit rerum iusto. Dolor distinctio adipisci molestias labore quo ut blanditiis veritatis ab. Laborum ipsum ipsum optio corrupti est ut commodi et harum. Qui nobis enim voluptatum.',
      dateLastEdited: '2018-09-08T04:33:44.014Z'
    },
    {
      name: 'Customer Assurance Analyst',
      image: 'http://lorempixel.com/640/480',
      description: 'Placeat sit aut. Accusamus et possimus. Veniam vitae necessitatibus. Laborum veritatis molestiae sed.',
      dateLastEdited: '2018-07-15T17:36:05.500Z'
    },
    {
      name: 'Customer Web Specialist',
      image: 'http://lorempixel.com/640/480',
      description: 'Tempore aliquam debitis. Alias quia ut commodi omnis nisi omnis. Eaque aut expedita consequatur.',
      dateLastEdited: '2017-10-29T23:03:55.220Z'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call and get JSON data', () => {
    const spyOnMethod = spyOn(service, 'getJSONData').and.callThrough();
    // act
    service.getJSONData();
    // assert
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should sort feed list by field', () => {
    const sortKeys = ['name', 'dateLastEdited'];
    sortKeys.forEach(sortField => {
      const valuesBeforeSort = feedList.map((feed, i) => feed[sortField]);
      const valuesAfterSort = service.sortByField(feedList, sortField).map((feed, i) => feed[sortField]);
      expect(valuesBeforeSort).not.toEqual(valuesAfterSort);
    });
  });

  it('should search for common matches', () => {
      const searchTerm = 'customer';
      const searchKeys = ['name', 'description'];
      expect(service.searchItems(searchTerm, feedList, searchKeys)).toEqual(feedList);
  });

  it('should search for exact match', () => {
    const searchTerm = '"customer web Specialist"';
    const searchKeys = ['name', 'description'];
    const exactMatchResult = [{
      name: 'Customer Web Specialist',
      image: 'http://lorempixel.com/640/480',
      description: 'Tempore aliquam debitis. Alias quia ut commodi omnis nisi omnis. Eaque aut expedita consequatur.',
      dateLastEdited: '2017-10-29T23:03:55.220Z'
    }];
    expect(service.searchItems(searchTerm, feedList, searchKeys)).toEqual(exactMatchResult);
  });

});
