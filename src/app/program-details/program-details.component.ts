import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { Program } from '../models/programModel';
import { Department } from '../models/departmentModel';
import { College } from '../models/collegeModel';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent {
  progid: number = 0;

  programData: Program = {
    progid: 0,
    progcolldeptid: 0,
    progcollid: 0,
    progfullname: '',
    progshortname: '',
  };

  collegeData: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  deptData: Department = {
    deptid: 0,
    deptcollid: 0,
    deptfullname: '',
    deptshortname: '',
  };

  constructor(private route: ActivatedRoute, private programService: StudentDataService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const progid = Number(params.get('progid'));
      this.progid = progid;

      this.programService.getProgram(this.progid).subscribe({
        next: (data: Program) => {
          this.programData = data;
          this.getCollege(this.programData.progcollid);
          this.getDepartment(this.programData.progcolldeptid);
        },
        error: (error) => {
          console.error('Error fetching program data', error);
        }
      });
    });
  }

  public showEditPage(progSelectedID: number) {
    this.router.navigate(['/programs/edit',progSelectedID]);
  }

  public handleBack() {
    this.router.navigate(['/programs']);
  }

  public getCollege(studid: number): void{
    this.programService.getCollege(studid).subscribe({
      next: (data: College) => {
        this.collegeData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching program data', error);
      }
    });
  }
  public getDepartment(studid: number): void{
    this.programService.getDepartment(studid).subscribe({
      next: (data: Department) => {
        this.deptData = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching program data', error);
      }
    });
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
