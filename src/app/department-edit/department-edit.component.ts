import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { Department } from '../models/departmentModel';
import { College } from '../models/collegeModel';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent {
  deptid: number = 0;

  deptData: Department = {
    deptid: 0,
    deptcollid: 0,
    deptfullname: '',
    deptshortname: '',
  };

  collegeCollection: Array<College> = [];

  constructor(private route: ActivatedRoute, private deptService: StudentDataService, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const deptid = Number(params.get('deptid'));
      this.deptid = deptid;

      this.deptService.getDepartment(this.deptid).subscribe({
        next: (data: Department) => {
          this.deptData = data;
          this.getColleges();
        },
        error: (error) => {
          console.error('Error fetching department data', error);
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
      (this.isNumber(this.deptData.deptid) && this.deptData.deptid > 0 ) &&
      this.isAlphabetic(this.deptData.deptfullname) &&
      this.isNumber(this.deptData.deptcollid)
    );
  }

  public handleBack() {
    this.router.navigate(['/departments']);
  }

  public updateDepartmentInfo() {
    if(this.validateForm()){
      if (!this.deptData.deptshortname) {
        this.deptData.deptshortname = ' ';
      }
      this.deptService.updateDepartment(this.deptData).subscribe({
        next: (response) => {
          console.log('Department updated successfully', response);
        },
        error: (error) => {
          alert('Error updating Department');
        },
        complete: () => {
          this.handleBack();
          alert("Update Successful");
        }
      });
    }
    
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
          this.handleBack();
        },
      });
    }
  }
}
