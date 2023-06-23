import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Class } from '../models/Class';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  public classes: Class[] = [];

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.serverHttp.getClasses().subscribe((data) => {
      console.log('getClasses', data);
      this.classes = data;
    });
  }

  public addClass() {
    this.router.navigate(['class-form', 0]);
  }

  public deleteClass(classId) {
    this.serverHttp.deleteClass(classId).subscribe((data) => {
      console.log('delete', data);
      this.loadData();
    });
  }

  public editClass(classId) {
    this.router.navigate(['class-form', classId]);
  }
}
