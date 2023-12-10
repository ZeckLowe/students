import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './models/studentModel';
import { College } from './models/collegeModel';
import { Program } from './models/programModel';
import { Department } from './models/departmentModel';


@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  baseURL: string = 'http://localhost:9001/usjr-app/api/'
  constructor(private http: HttpClient) { }

  //Student Api
  getStudents(): Observable<any> {
    return this.http.get(this.baseURL+'getstudents.php');
  }

  getStudent(studid: number): Observable<any> {
    return this.http.get(`${this.baseURL}getstudentinfo.php?studid=${studid}`);
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post(this.baseURL+'savestudent.php', studentData);
  }

  updateStudent(studentData: Student): Observable<any> {
    return this.http.post(`${this.baseURL}poststudentupdates.php`, studentData);
  }

  deleteStudent(studentid: number): Observable<any> {
    return this.http.delete(`${this.baseURL}removestudent.php?studid=${studentid}`);
  }

  //College Api
  getColleges(): Observable<any> {
    return this.http.get(this.baseURL+'getcolleges.php');
  }
  
  getCollege(collid: number): Observable<any> {
    return this.http.get(`${this.baseURL}getcollegeinfo.php?collid=${collid}`);
  }

  addCollege(collegeData: any): Observable<any> {
    return this.http.post(this.baseURL+'savecollege.php', collegeData);
  }

  updateCollege(collegeData: College): Observable<any> {
    return this.http.post(`${this.baseURL}postcollegeupdates.php`, collegeData);
  }

  deleteCollege(collid: number): Observable<any> {
    return this.http.delete(`${this.baseURL}removecollege.php?collid=${collid}`);
  }

  //Program Api
  getPrograms(): Observable<any> {
    return this.http.get(this.baseURL+'getprograms.php');
  }
  
  getProgram(progid: number): Observable<any> {
    return this.http.get(`${this.baseURL}getprograminfo.php?progid=${progid}`);
  }

  addProgram(programData: any): Observable<any> {
    return this.http.post(this.baseURL+'saveprogram.php', programData);
  }

  updateProgram(programData: Program): Observable<any> {
    return this.http.post(`${this.baseURL}postprogramupdates.php`, programData);
  }

  deleteProgram(progid: number): Observable<any> {
    return this.http.delete(`${this.baseURL}removeprogram.php?progid=${progid}`);
  }

  //Departments Api
  getDepartments(): Observable<any> {
    return this.http.get(this.baseURL+'getdepartments.php');
  }
  
  getDepartment(deptid: number): Observable<any> {
    return this.http.get(`${this.baseURL}getdepartmentsinfo.php?deptid=${deptid}`);
  }

  addDepartment(departmentData: any): Observable<any> {
    return this.http.post(this.baseURL+'savedepartment.php', departmentData);
  }

  updateDepartment(departmentData: Department): Observable<any> {
    return this.http.post(`${this.baseURL}postdepartmentupdates.php`, departmentData);
  }

  deleteDepartment(deptid: number): Observable<any> {
    return this.http.delete(`${this.baseURL}removedepartment.php?deptid=${deptid}`);
  }

  //Other Api
  getCollegeProgram(collId: number): Observable<Program[]> {
    const url = `${this.baseURL}getcollegeprogram.php?collid=${collId}`;
    return this.http.get<Program[]>(url);
  }

  getCollegeDept(collId: number): Observable<Department[]> {
    const url = `${this.baseURL}getcollegedept.php?collid=${collId}`;
    return this.http.get<Department[]>(url);
  }
}
