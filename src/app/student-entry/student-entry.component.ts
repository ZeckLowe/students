import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

@Component({
  selector: 'app-student-entry',
  templateUrl: './student-entry.component.html',
  styleUrls: ['./student-entry.component.css']
})
export class StudentEntryComponent {
  constructor(private route: ActivatedRoute, private studentService: StudentDataService, private router: Router) {}

  errorMessage: string = "";
  selectedStudentID: number = 0;
  response: any;
  showAddStudentForm: boolean = false;
  
  studentData: student = {
    studid: 0,
    studfirstname: '',
    studlastname: '',
    studmidname: '',
    studprogid: 0,
    studcollid: 0,
    studyear: 0,
  };

  studentCollection: Array<Student> = [];

  public isNumber(value: any): boolean {
    return /^\dt+$/.test(value);
  }

  public isAlphabetic(value: any): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
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
          this.closeAddStudentForm();
          this.getStudents();
          alert('Successfully added the student');
        }
      })
    }
  }


}
