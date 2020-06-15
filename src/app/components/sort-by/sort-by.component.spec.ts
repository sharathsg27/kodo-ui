import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByComponent } from './sort-by.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../../app.service';
import {HttpClientModule} from '@angular/common/http';

describe('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SortByComponent ],
      providers: [ AppService, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

