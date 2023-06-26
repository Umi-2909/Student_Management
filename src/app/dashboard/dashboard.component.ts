import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from '../Services/server-http.service';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalStudents = 0;
  public totalClasses = 0;

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService
  ) {}

  ngOnInit(): void {
    this.common.totalStudents$.subscribe((total) => {
      this.totalStudents = total;
    });
    if (this.common.totalStudents === 0) {
      this.serverHttp.getStudents().subscribe((data) => {
        this.common.setTotalStudents(data.length);
      });
    }

    this.common.totalClasses$.subscribe((total) => {
      this.totalClasses = total;
    });
    if (this.common.totalClasses === 0) {
      this.serverHttp.getClasses().subscribe((data) => {
        this.common.setTotalClasses(data.length);
      });
    }
  }

}
