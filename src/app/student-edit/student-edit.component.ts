import { Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import { StudentDataService } from '../student-data.service';
import { Student } from '../models/studentModel';
import { College } from '../models/collegeModel';
import { Program } from '../models/programModel';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {
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

  collegeCollection: Array<College> = [];
  programCollection: Array<Program> = [];

  public isNumber(value: any): boolean {
    return /^\d+$/.test(value);
  }
  public isAlphabetic(value: any): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  constructor(private route: ActivatedRoute, private studentService: StudentDataService, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const studid = Number(params.get('studid'));
      this.studid = studid;

      this.studentService.getStudent(this.studid).subscribe({
        next: (data: Student) => {
          this.studentData = data;
          this.getColleges();
          this.updatePrograms();
        },
        error: (error) => {
          console.error('Error fetching student data', error);
        }
      });
    });
  }

  public handleBack() {
    this.router.navigate(['/students']);
  }

  public updateStudentInfo() {
    if (this.validateForm()) {
      if (!this.studentData.studmidname) {
        this.studentData.studmidname = ' ';
      }
      
      this.studentService.updateStudent(this.studentData).subscribe({
        next: (response) => {
          console.log('Student updated successfully', response);
        },
        error: (error) => {
          alert('Error updating Student '+error);
        },
        complete: () => {
          this.handleBack();
          alert("Update Successful");
        }
      });
    } else {
      alert('Please check your inputs');
    }
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

  public validateForm(): boolean {
    return (
      this.isNumber(this.studentData.studid) &&
      this.isAlphabetic(this.studentData.studfirstname) &&
      (this.studentData.studmidname === '' || this.isAlphabetic(this.studentData.studmidname)) &&
      this.isAlphabetic(this.studentData.studlastname) &&
      !!this.studentData.studcollid &&
      !!this.studentData.studprogid &&
      this.isNumber(this.studentData.studyear)
    );
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
