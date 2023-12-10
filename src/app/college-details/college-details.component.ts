import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StudentDataService } from '../student-data.service';

import { College } from '../models/collegeModel';

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent {
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
          console.error('Error fetching College data', error);
        }
      });
    });
  }

  public showEditPage(progSelectedID: number) {
    this.router.navigate(['/colleges/edit', progSelectedID]);
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

  public handleBack() {
    this.router.navigate(['/colleges']);
  }
}
