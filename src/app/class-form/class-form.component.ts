import { Component, OnInit } from '@angular/core';
import { Class } from './../models/Class';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {
  public id = 0;
  public classForm = new FormGroup({
    className: new FormControl(''),
    academicYear: new FormControl(''),
    facultyAdvisor: new FormControl(''),
    major: new FormControl(''),
  });
  class: Class = {
    id: '',
    className: '',
    academicYear: '',
    facultyAdvisor: '',
    major:'',
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
    this.serverHttp.getClass(id).subscribe((data) => {
      console.log('getClass', data);
      for (const controlName in this.classForm.controls) {
        if (controlName) {
          this.classForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }

  private createNewData() {
    const newClass = {};
    for (const controlName in this.classForm.controls) {
      if (controlName) {
        newClass[controlName] = this.classForm.controls[controlName].value;
      }
    }
    return newClass as Class;
  }

  public saveAndGotoList() {
    if (this.id > 0) {
      this.serverHttp.modifyClass(this.id, this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.classForm.reset();
        this.router.navigate(['classes']);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      });
    } else {
      this.serverHttp.addClass(this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.classForm.reset();
        this.router.navigate(['classes']);
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      });
    }
  }


  public save() {
    if (this.id > 0) {
      this.serverHttp.modifyClass(this.id, this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.classForm.reset();
      });
    } else {
      this.serverHttp.addClass(this.createNewData()).subscribe((data) => {
        this.showSuccessMessage = true;
        this.common.increamentClass();
        this.classForm.reset();
      });
    }
  }

}
