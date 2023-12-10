import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { Student } from '../models/studentModel';
import { College } from '../models/collegeModel';
import { Program } from '../models/programModel';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  studid: number = 0;

  studentData: Student = {
    studid: 0,
    studfirstname: '',
    studlastname: '',
    studmidname: '',
    studprogid: 0,
    studcollid: 0,
    studyear: 0, 
  };

  collegeData: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  programData: Program = {
    progid: 0,
    progcolldeptid: 0,
    progcollid: 0,
    progfullname: '',
    progshortname: '',
  };
  constructor(private route: ActivatedRoute, private studentService: StudentDataService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studid = Number(params.get('studid'));
      this.studid = studid;
      this.studentService.getStudent(this.studid).subscribe({
        next: (data: Student) => {
          this.studentData = data;
          this.getCollege(this.studentData.studcollid);
          this.getProgram(this.studentData.studprogid);
        },
        error: (error) => {
          console.error('Error fetching student data', error);
        }
      });
    });
  }

  public showEditPage(selectedStudentID: number) {
    this.router.navigate(['/students/edit',selectedStudentID]);
  }

  public getCollege(studid: number): void{
    this.studentService.getCollege(studid).subscribe({
      next: (data: College) => {
        this.collegeData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching program data', error);
      }
    });
  }

  public getProgram(studid: number): void{
    this.studentService.getProgram(studid).subscribe({
      next: (data: Program) => {
        this.programData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching program data', error);
      }
    });
  }

  public handleBack() {
    this.router.navigate(['/students']);
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
          this.handleBack();
        },
      });
    }
  }
}
