import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProgramComponent } from '../program/program.component';
import { DepartmentComponent } from '../department/department.component';
import { CollegeComponent } from '../college/college.component';
import { StudentComponent } from '../student/student.component';

import { StudentEntryComponent } from '../student-entry/student-entry.component'; 
import { CollegeEntryComponent } from '../college-entry/college-entry.component';
import { ProgramEntryComponent } from '../program-entry/program-entry.component';
import { DepartmentEntryComponent } from '../department-entry/department-entry.component';

import { NavigationComponent } from '../navigation/navigation.component';

import { StudentDetailsComponent } from '../student-details/student-details.component';
import { CollegeDetailsComponent } from '../college-details/college-details.component';
import { ProgramDetailsComponent } from '../program-details/program-details.component';
import { DepartmentDetailsComponent } from '../department-details/department-details.component';

import { StudentEditComponent } from '../student-edit/student-edit.component';
import { ProgramEditComponent } from '../program-edit/program-edit.component';
import { CollegeEditComponent } from '../college-edit/college-edit.component';
import { DepartmentEditComponent } from '../department-edit/department-edit.component';

const routes: Routes = [
  //Student Routes
  { path: 'students', children: [
    {path:'', component:StudentComponent, pathMatch: 'full'},
    {path:':studid', component:StudentDetailsComponent},
    {path: 'edit/:studid', component: StudentEditComponent},
  ] },
  //College Routes
  { path: 'colleges', children: [
    {path:'', component:CollegeComponent, pathMatch: 'full'},
    {path:'add', component:CollegeEntryComponent},
    {path:':collid', component:CollegeDetailsComponent},
    {path: 'edit/:collid', component: CollegeEditComponent}
  ] },
  //Program Routes
  { path: 'programs', children: [
    {path:'', component:ProgramComponent, pathMatch: 'full'},
    {path:'add', component:ProgramEntryComponent},
    {path:':progid', component:ProgramDetailsComponent},
    {path: 'edit/:progid', component: ProgramEditComponent},
    {path: 'home', component: ProgramEditComponent}
  ] },
  //Department Routes
  { path: 'departments', children: [
    {path:'', component:DepartmentComponent, pathMatch: 'full'},
    {path:'add', component:DepartmentEntryComponent},
    {path:':deptid', component:DepartmentDetailsComponent},
    {path: 'edit/:deptid', component: DepartmentEditComponent},
    {path: 'home', component: DepartmentComponent}
  ] },
  //Redirect Routes
  { path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: '**', redirectTo: '/students'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
