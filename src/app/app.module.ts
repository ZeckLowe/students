import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NavigationComponent } from './navigation/navigation.component';

import { StudentEntryComponent } from './student-entry/student-entry.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

import { ProgramEntryComponent } from './program-entry/program-entry.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';

import { DepartmentEntryComponent } from './department-entry/department-entry.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';

import { CollegeEntryComponent } from './college-entry/college-entry.component';
import { CollegeEditComponent } from './college-edit/college-edit.component';
import { CollegeDetailsComponent } from './college-details/college-details.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDataService } from './student-data.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentEntryComponent,
    NavigationComponent,
    StudentEditComponent,
    StudentDetailsComponent,
    ProgramEntryComponent,
    ProgramEditComponent,
    ProgramDetailsComponent,
    DepartmentEntryComponent,
    DepartmentEditComponent,
    DepartmentDetailsComponent,
    CollegeEntryComponent,
    CollegeEditComponent,
    CollegeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [StudentDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
