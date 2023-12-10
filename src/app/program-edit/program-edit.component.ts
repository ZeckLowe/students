import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { Program } from '../models/programModel';
import { Department } from '../models/departmentModel';
import { College } from '../models/collegeModel';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent {
  progid: number = 0;

  programData: Program = {
    progid: 0,
    progcolldeptid: 0,
    progcollid: 0,
    progfullname: '',
    progshortname: '',
  };

  collegeCollection: Array<College> = [];
  deptCollection: Array<Department> = [];

  constructor(private route: ActivatedRoute, private programService: StudentDataService, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const progid = Number(params.get('progid'));
      this.progid = progid;

      this.programService.getProgram(this.progid).subscribe({
        next: (data: Program) => {
          this.programData = data;
          this.getColleges();
          this.updateDepartment();
        },
        error: (error) => {
          console.error('Error fetching program data', error);
        }
      });
    });
  }

  public isNumber(value: any): boolean {
    return /^\d+$/.test(value);
  }
  public isAlphabetic(value: any): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  public validateForm(): boolean {
    return (
      (this.isNumber(this.programData.progid) && this.programData.progid > 0 ) &&
      this.isAlphabetic(this.programData.progfullname) &&
      this.isNumber(this.programData.progcollid) &&
      this.isNumber(this.programData.progcolldeptid)
    );
  }

  public handleBack() {
    this.router.navigate(['/programs']);
  }

  public updateProgramInfo() {
    if (this.validateForm()) {
      if (!this.programData.progshortname) {
        this.programData.progshortname = ' ';
      }
      this.programService.updateProgram(this.programData).subscribe({
        next: (response) => {
          console.log('Program updated successfully', response);
        },
        error: (error) => {
          alert('Error updating Program');
        },
        complete: () => {
          this.handleBack();
          alert("Update Successful");
        }
      });
    } else {
        alert('Please fill all the required fields correctly!');
    }
  }

  public getColleges() {
    this.programService.getColleges().subscribe({
      next: (colleges: College[]) => {
        this.collegeCollection = colleges;
      },
      error: (error) => {
        console.error('Error fetching colleges', error);
      },
    });
  }

  public updateDepartment() {
    if (this.programData.progcollid) {
      console.log(this.programData.progcollid);
      this.programService.getCollegeDept(this.programData.progcollid).subscribe({
        next: (depts: Department[]) => {
          this.deptCollection = depts;
          console.log(depts);
        },
        error: (error) => {
          console.error('Error fetching programs', error);
        },
      });
    }
  }

  public deleteProgram(selectedProgramID: number) {
    if (confirm('Are you sure you want to delete this program?  ' +selectedProgramID)) {
      this.programService.deleteProgram(selectedProgramID).subscribe({
        next: (response) => {
          console.log('Program deleted successfully', response);
        },
        error: (error) => {
          alert('Successfully Deleted the Program ' +error);
        },
        complete: () => {
          alert('Successfully Deleted the Program');
          this.handleBack();
        },
      });
    }
  }
}
