import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { College } from '../models/collegeModel';

@Component({
  selector: 'app-college-edit',
  templateUrl: './college-edit.component.html',
  styleUrls: ['./college-edit.component.css']
})
export class CollegeEditComponent {
  collid: number = 0;

  collegeData: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  constructor(private route: ActivatedRoute, private collegeService: StudentDataService, private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const collid = Number(params.get('collid'));
      this.collid = collid;

      this.collegeService.getCollege(this.collid).subscribe({
        next: (data: College) => {
          this.collegeData = data;
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
  
  public handleBack() {
    this.router.navigate(['/colleges']);
  }

  public updateCollegeInfo() {
    this.collegeService.updateCollege(this.collegeData).subscribe({
      next: (response) => {
        console.log('College updated successfully', response);
      },
      error: (error) => {
        alert('Error updating Program');
      },
      complete: () => {
        this.handleBack();
        alert("Update Successful");
      }
    });
  }

  public deleteCollege(selectedCollegeID: number) {
    if (confirm('Are you sure you want to delete this College?  ' +selectedCollegeID)) {
      this.collegeService.deleteCollege(selectedCollegeID).subscribe({
        next: (response) => {
          console.log('College deleted successfully', response);
        },
        error: (error) => {
          alert('Error in deleting the college ');
        },
        complete: () => {
          alert('Successfully Deleted the college');
          this.handleBack();
        },
      });
    }
  }
}
