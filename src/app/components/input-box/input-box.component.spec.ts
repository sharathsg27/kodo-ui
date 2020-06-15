import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBoxComponent } from './input-box.component';
import {AppService} from '../../app.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('InputBoxComponent', () => {
  let component: InputBoxComponent;
  let fixture: ComponentFixture<InputBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ InputBoxComponent ],
      providers: [ AppService, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
