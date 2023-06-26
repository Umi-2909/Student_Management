import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from '../Services/server-http.service';
import { Student } from '../models/Student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  classList: string[] = [];
  className: string;

  constructor(
    private route: ActivatedRoute,
    private serverHttpService: ServerHttpService,
    private router: Router
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.className = params.get('className');
      this.loadStudentsByClassName(this.className);
    });
  }

  loadStudentsByClassName(className: string) {
    this.serverHttpService.getStudentsByClassName(className)
      .subscribe((students: Student[]) => {
        this.students = students;
      });
  }

  navigateToStudentList(className: string) {
    this.router.navigate(['/student-list', className]);
  }

}
