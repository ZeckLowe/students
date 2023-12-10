import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import { StudentDataService } from '../student-data.service';
import { Student } from '../models/studentModel';
import { College } from '../models/collegeModel';
import { Program } from '../models/programModel';

@Component({
  selector: 'app-student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.css']
})
export class StudentEntryComponent {
  ngOnInit(): void {
    this.getStudents();
    this.getColleges();
    this.updatePrograms();
  }

  constructor(private route: ActivatedRoute, private studentService: StudentDataService, private router: Router) {}

  errorMessage: string = '';
  selectedStudentID: number = 0;
  response: any;
  showAddStudentForm: boolean = false;
  showStudentList: boolean = false;
  showStudentInfoForm: boolean = false
  
  studentData: Student = {
    studid: 0,
    studfirstname: '',
    studlastname: '',
    studmidname: '',
    studprogid: 0,
    studcollid: 0,
    studyear: 0,
  };

  studentCollection: Array<Student> = [];
  collegeCollection: Array<College> = [];
  programCollection: Array<Program> = [];

  public isNumber(value: any): boolean {
    return /^\dt+$/.test(value);
  }

  public isAlphabetic(value: any): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  public getStudents() {
    this.studentService.getStudents().subscribe({
      next: (response: any) => {
        console.log('Response Received');
        console.log(response);
        this.studentCollection = response; 
        this.showStudentList = true;
      },
      error: (error) => {
        console.log('Response has Failed.');
        this.errorMessage = error;
        console.log(error);
      },
    });
  }

  public validateForm(): boolean {
    return (
      (this.isNumber(this.studentData.studid) && this.studentData.studid > 0) &&
      this.isAlphabetic(this.studentData.studfirstname) &&
      this.isAlphabetic(this.studentData.studlastname) &&
      !!this.studentData.studcollid &&
      !!this.studentData.studprogid &&
      (this.isNumber(this.studentData.studyear) && this.studentData.studyear > 0 && this.studentData.studyear < 7)
    );
  }

  public showStudentDetails(selectedStudentID: number){
    console.log('showStudentDetails is clicked');
    console.log(selectedStudentID)
    this.router.navigate(['/students', selectedStudentID]);
  }

  public showEditPage(selectedStudentID: number){
    console.log('showEditPage is clicked');
    console.log(selectedStudentID);
    this.router.navigate(['/students/edit', selectedStudentID]);
  }

  public deleteStudent(selectedStudentID: number) {
    if (confirm('Are you sure you want to delete this student?  ' +selectedStudentID)) {
      this.studentService.deleteStudent(selectedStudentID).subscribe({
        next: (response) => {
          console.log('Student deleted successfully', response);
        },
        error: (error) => {
          alert('Successfully Deleted the student ' +error);
        },
        complete: () => {
          alert('Successfully Deleted the student');
          this.getStudents();
        },
      });
    }
  }

  public submitAddStudentForm() {
    if(this.validateForm()){
      if(!this.studentData.studmidname){
        this.studentData.studmidname = ' ';
      }
      console.log('Submitting student data:', this.studentData);
      this.studentService.addStudent(this.studentData).subscribe({
        next: (response) => {
          console.log('Student saved successfull', response);
        },
        error: (error) => {
          alert('Error saving student ' +error);
        },
        complete: () => {
          // this.closeAddStudentForm();
          // this.getStudents();
          alert('Successfully added the student');
        }
      });
    }else{
      alert('Make sure your inputs are correct!')
    }
  }

  public openAddStudentForm(){
    console.log('openAddStudentForm is clicked');
    this.showAddStudentForm = true;
  }

  public openStudentInfoForm(){
    console.log('clicked');
    this.showStudentInfoForm = true;
  }

  public closeAddStudentForm(){
    this.showAddStudentForm = false;
    this.clearForm()
  }

  public getColleges() {
    this.studentService.getColleges().subscribe({
      next: (colleges: College[]) => {
        this.collegeCollection = colleges;
      },
      error: (error) => {
        console.error('Error fetching colleges', error);
      },
    });
  }

  public updatePrograms() {
    if (this.studentData.studcollid) {
      console.log(this.studentData.studcollid);
      this.studentService.getCollegeProgram(this.studentData.studcollid).subscribe({
        next: (programs: Program[]) => {
          this.programCollection = programs;
          console.log(programs);
        },
        error: (error) => {
          console.error('Error fetching programs', error);
        },
      });
    }
  }

  public clearForm(){
    this.studentData.studid = 0;
    this.studentData.studfirstname = '';
    this.studentData.studlastname = '';
    this.studentData.studmidname ='';
    this.studentData.studprogid = 0;
    this.studentData.studcollid = 0;
    this.studentData.studyear = 0;
  }
}
