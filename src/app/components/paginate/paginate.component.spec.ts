import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateComponent } from './paginate.component';
import {AppService} from '../../app.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PaginateComponent', () => {
  let component: PaginateComponent;
  let fixture: ComponentFixture<PaginateComponent>;
  let service: AppService;
  const searchResults = [
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ PaginateComponent ],
      providers: [ AppService, HttpClientModule ]
    })
    .compileComponents();
    service = TestBed.inject(AppService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set total pages based on search', () => {
    spyOn(component, 'changePageOnSearch').and.callThrough();
    component.changePageOnSearch(searchResults);
    expect(component.changePageOnSearch).toHaveBeenCalled();
    expect(component.totalPages).toEqual(1);
  });

  it('should check next page number increment/decrement', () => {
    const currentPage = component.currentPage;
    const actionTypes = ['back', 'next'];
    const items = ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'];
    spyOn(component, 'changePageNumber').and.callThrough();
    actionTypes.forEach(action => {
      component.changePageNumber(action, items);
      expect(component.changePageNumber).toHaveBeenCalled();
      if (action === 'next') expect(component.currentPage).toBeGreaterThan(currentPage);
      else if (action === 'back') expect(component.currentPage).toBeGreaterThanOrEqual(currentPage);
    });
  });
});
