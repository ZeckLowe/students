import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { StudentDataService } from '../student-data.service';
import { College } from '../models/collegeModel';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {
  ngOnInit(): void {
    this.getColleges();
  }

  errorMessage: string = '';
  selectedCollegeID: number = 0;
  response: any;
  showCollegeList: Boolean = false;
  showAddCollegeForm: boolean = false;

  collegeData: College = {
    collid: 0,
    collfullname: '',
    collshortname: '',
  };

  collegeCollection: Array<College> = [];

  constructor(private route: ActivatedRoute, private collegeService: StudentDataService, private router: Router) {}

  public isNumber(value: any): boolean {
    return /^\d+$/.test(value);
  }
  public isAlphabetic(value: any): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  public getColleges() {
    this.collegeService.getColleges().subscribe({
      next: (response: any) => {
        console.log('Response Received');
        console.log(response);
        this.collegeCollection = response; 
        this.showCollegeList = true;
      },
      error: (error) => {
        console.log('Response has Failed.');
        this.errorMessage = error;
        console.log(error);
      },
    });
  }

  public validateForm(): boolean {
    return (
      this.isNumber(this.collegeData.collid) &&
      this.isAlphabetic(this.collegeData.collfullname) &&
      this.isAlphabetic(this.collegeData.collshortname)
    );
  }

  public showCollegeDetails(selectedCollegeID: number) {
    console.log('I am clicked!');
    console.log(selectedCollegeID)
    this.router.navigate(['/colleges',selectedCollegeID]);
  }

  public showEditPage(selectedCollegeID: number) {
    console.log('I am clicked!');
    console.log(selectedCollegeID)
    this.router.navigate(['/colleges/edit',selectedCollegeID]);
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
          this.getColleges();
        },
      });
    }
  }

  public submitAddCollegeForm() {
    console.log(this.validateForm())
    if(this.validateForm()){
      console.log('Submitting College data:', this.collegeData);
      this.collegeService.addCollege(this.collegeData).subscribe({
        next: (response) => {
          console.log('College saved successfully', response);
        },
        error: (error) => {
          alert('Error saving College');
        },
        complete: () => {
          this.closeAddCollegeForm();
          this.getColleges();
          alert('Successfully added the College');
        }
      });
    }else{
      alert("Please check your inputs!");
    }
  }

  public openAddCollegeForm(){
    console.log('clicked');
    this.router.navigate(['/colleges/add']);
  }

  public closeAddCollegeForm(){
    this.showAddCollegeForm = false;
  }

  public clearForm(){
    this.collegeData.collid = 0;
    this.collegeData.collfullname = '';
    this.collegeData.collshortname = '';
  }
}
