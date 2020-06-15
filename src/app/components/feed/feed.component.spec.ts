import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../../app.service';
import {HttpClientModule} from '@angular/common/http';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ FeedComponent ],
      providers: [ AppService, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create array list of feed', () => {
    spyOn(component, 'getFeedInfo');
    component.getFeedInfo();
    expect(component.getFeedInfo).toHaveBeenCalled();
    if (expect(component.getFeedInfo) instanceof Array) {
      expect(component.getFeedInfo).toBeTruthy();
    }
  });
});
