import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FeedComponent } from './components/feed/feed.component';
import { HeaderComponent } from './components/header/header.component';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import {FormsModule} from '@angular/forms';
import { PaginateComponent } from './components/paginate/paginate.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    HeaderComponent,
    InputBoxComponent,
    SortByComponent,
    PaginateComponent,
    DataTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
