import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Student } from '../models/Student';
import * as _ from 'lodash';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  public students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    const className = this.route.snapshot.paramMap.get('className');
  }

  private loadData() {
    this.serverHttp.getStudents().subscribe((data) => {
      console.log('getStudents', data);
      this.students = data;
      this.common.setTotalStudents(data.length);
    });
  }

  loadStudentsByClassName(className: string) {
    this.serverHttp.getStudentsByClassName(className)
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

  public addStudent() {
    this.router.navigate(['student-form', 0]);
  }

  public deleteStudent(studentId) {
    this.serverHttp.deleteStudent(studentId).subscribe((data) => {
      console.log('delete', data);
      this.loadData();
    });
  }

  public editStudent(studentId) {
    this.router.navigate(['student-form', studentId]);
  }

  navigateToStudentList(className: string) {
    this.router.navigate(['/student-list', className]);
  }
}
