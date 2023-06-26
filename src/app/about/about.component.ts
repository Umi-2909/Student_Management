import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {


  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService
  ) {
  }

  ngOnInit(): void {
  }

}
