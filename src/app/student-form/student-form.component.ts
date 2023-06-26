import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../models/Student';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  public id = 0;
  public studentForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    className: new FormControl(''),
    academicYear: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl(''),
  });
  student: Student = {
    id: '',
    code: '',
    name: '',
    gender: '',
    dob: undefined,
    className: '',
    academicYear: '',
    email: '',
    phone: '',
    picture: ''
  };
  public showSuccessMessage = false;

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.loadData(this.id);
    }
  }

  private loadData(id) {
    this.serverHttp.getStudent(id).subscribe((data) => {
      console.log('getStudent', data);
      for (const controlName in this.studentForm.controls) {
        if (controlName) {
          this.studentForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }

  private createNewData() {
    const newStudent = {};
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.studentForm.controls[controlName].value;
      }
    }
    return newStudent as Student;
  }

  public saveAndGotoList() {
    if (this.id > 0) {
      this.serverHttp.modifyStudent(this.id, this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.studentForm.reset();
        this.router.navigate(['students']);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      });
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.studentForm.reset();
        this.router.navigate(['students']);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      });
    }
  }


  public save() {
    if (this.id > 0) {
      this.serverHttp.modifyStudent(this.id, this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.studentForm.reset();
      });
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.common.increamentStudent();
        this.studentForm.reset();
      });
    }
  }

}
