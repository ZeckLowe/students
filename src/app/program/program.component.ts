import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { StudentDataService } from '../student-data.service';
import { Program } from '../models/programModel';
import { College } from '../models/collegeModel';
import { Department } from '../models/departmentModel';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {
  ngOnInit(): void {
    this.getPrograms();
    this.getColleges();
    this.updateDepartment();
}

programCollection: Array<Program> = [];

constructor(private route: ActivatedRoute, private programService: StudentDataService, private router: Router) {}

errorMessage: string = '';
selectedProgramID: number = 0;
response: any;
showProgramList: Boolean = false;
showAddProgramForm: boolean = true;

programData: Program = {
  progid: 0,
  progcolldeptid: 0,
  progcollid: 0,
  progfullname: '',
  progshortname: '',
};

collegeCollection: Array<College> = [];
deptCollection: Array<Department> = [];

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

public getPrograms() {
  this.programService.getPrograms().subscribe({
    next: (response: any) => {
      console.log('Response Received');
      console.log(response);
      this.programCollection = response; 
      this.showProgramList = true;
    },
    error: (error) => {
      console.log('Response has Failed.');
      this.errorMessage = error;
      console.log(error);
    },
  });
}

public showProgramDetails(selectedProgramID: number) {
  console.log('I am clicked!');
  console.log(selectedProgramID)
  this.router.navigate(['/programs',selectedProgramID]);
}

public showEditPage(selectedProgramID: number) {
  console.log('I am clicked!');
  console.log(selectedProgramID)
  this.router.navigate(['/programs/edit',selectedProgramID]);
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
        this.getPrograms();
      },
    });
  }
}

public submitAddProgramForm() {
  if(this.validateForm()){
    if (!this.programData.progshortname) {
      this.programData.progshortname = ' ';
    }
    console.log('Submitting Program data:', this.programData);
    this.programService.addProgram(this.programData).subscribe({
      next: (response) => {
        console.log('Program saved successfully', response);
      },
      error: (error) => {
        alert('Error saving Program ' +error);
      },
      complete: () => {
        this.closeAddProgramForm();
        this.getPrograms();
        alert('Successfully added the Program');
      }
    });
  }else{
    alert("Please check your inputs!");
  }
  
  }

  public openAddProgramForm(){
    console.log('I am clicked!');
    this.router.navigate(['/programs/add']);
  }

  public clearForm(){
    this.programData.progid = 0;
    this.programData.progfullname = '';
    this.programData.progshortname = '';
    this.programData.progcollid = 0;
    this.programData.progcolldeptid = 0;
  }

  public openProgramInfoForm(){
    console.log('clicked');
    this.showAddProgramForm = true;
  }

  public closeAddProgramForm(){
    console.log('I am clicked!');
    this.router.navigate(['/programs/home']);
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
}
