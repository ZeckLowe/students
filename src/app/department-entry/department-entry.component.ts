import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { StudentDataService } from '../student-data.service';
import { Department } from '../models/departmentModel';
import { College } from '../models/collegeModel';

@Component({
  selector: 'app-department-entry',
  templateUrl: './department-entry.component.html',
  styleUrls: ['./department-entry.component.css']
})
export class DepartmentEntryComponent {
  ngOnInit(): void {
    this.getDepartments();
    this.getColleges();
  }

  deptCollection: Array<Department> = [];

  constructor(private route: ActivatedRoute, private deptService: StudentDataService, private router: Router) {}
  errorMessage: string = '';
  selectedDeptID: number = 0;
  response: any;
  showDeptList: Boolean = false;
  showAddDeptForm: boolean = false;

  deptData: Department = {
    deptid: 0,
    deptcollid: 0,
    deptfullname: '',
    deptshortname: '',
  };

  collegeCollection: Array<College> = [];


  public isNumber(value: any): boolean {
    return /^\d+$/.test(value);
  }
  public isAlphabetic(value: any): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  public getDepartments() {
    this.deptService.getDepartments().subscribe({
      next: (response: any) => {
        console.log('Response Received');
        console.log(response);
        this.deptCollection = response; 
        this.showDeptList = true;
      },
      error: (error) => {
        console.log('Response has Failed.');
        this.errorMessage = error;
        console.log(error);
      },
    });
  }

  public showDeptDetails(selectedDeptID: number) {
    console.log('I am clicked!');
    console.log(selectedDeptID)
    this.router.navigate(['/departments',selectedDeptID]);
  }

  public showEditPage(selectedDeptID: number) {
    console.log('I am clicked!');
    console.log(selectedDeptID)
    this.router.navigate(['/departments/edit',selectedDeptID]);
  }

  public deleteDepartment(selectedDeptID: number) {
    if (confirm('Are you sure you want to delete this department?  ' +selectedDeptID)) {
      this.deptService.deleteDepartment(selectedDeptID).subscribe({
        next: (response) => {
          console.log('Department deleted successfully', response);
        },
        error: (error) => {
          alert('Error in deleting the department');
        },
        complete: () => {
          alert('Successfully Deleted the department');
          this.getDepartments();
        },
      });
    }
  }

  public validateForm(): boolean {
    return (
      (this.isNumber(this.deptData.deptid) && this.deptData.deptid > 0 ) &&
      this.isAlphabetic(this.deptData.deptfullname) &&
      this.isNumber(this.deptData.deptcollid)
    );
  }

  public submitAddDeptForm() {
    if(this.validateForm()){
      if (!this.deptData.deptshortname) {
        this.deptData.deptshortname = ' ';
      }
      console.log('Submitting Department data:', this.deptData);
      this.deptService.addDepartment(this.deptData).subscribe({
        next: (response) => {
          console.log('Department saved successfully', response);
        },
        error: (error) => {
          alert('Error saving Department');
        },
        complete: () => {
          this.closeAddDepartmentForm();
          this.getDepartments();
          alert('Successfully added the College');
        }
      });
    }else{
      alert("Please check your inputs!");
    }
  }

  public openAddDepartmentForm(){
    console.log('clicked');
    this.showAddDeptForm = true;
  }

  public closeAddDepartmentForm(){
    this.showAddDeptForm = false;
    this.clearForm();
  }

  public getColleges() {
    this.deptService.getColleges().subscribe({
      next: (colleges: College[]) => {
        this.collegeCollection = colleges;
      },
      error: (error) => {
        console.error('Error fetching colleges', error);
      },
    });
  }

  public clearForm(){
    this.deptData.deptid = 0;
    this.deptData.deptfullname = '';
    this.deptData.deptshortname = '';
    this.deptData.deptcollid = 0;
  }
}
