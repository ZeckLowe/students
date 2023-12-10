import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { Department } from '../models/departmentModel';
import { College } from '../models/collegeModel';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent {
  deptid: number = 0;

  deptData: Department = {
    deptid: 0,
    deptcollid: 0,
    deptfullname: '',
    deptshortname: '',
  };

  collegeData: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  constructor(private route: ActivatedRoute, private deptService: StudentDataService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const deptid = Number(params.get('deptid'));
      this.deptid = deptid;

      this.deptService.getDepartment(this.deptid).subscribe({
        next: (data: Department) => {
          this.deptData = data;
          this.getCollege(this.deptData.deptcollid);
        },
        error: (error) => {
          console.error('Error fetching Department data', error);
        }
      });
    });
  }

  public showEditPage(deptSelectedID: number) {
    this.router.navigate(['/departments/edit', deptSelectedID]);
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

  public handleBack() {
    this.router.navigate(['/departments']);
  }

  public getCollege(collid: number): void{
    this.deptService.getCollege(collid).subscribe({
      next: (data: College) => {
        this.collegeData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching program data', error);
      }
    });
  }
}
