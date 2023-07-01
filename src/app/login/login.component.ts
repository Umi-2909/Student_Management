// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   public loginFrom !: FormGroup

//   constructor(private FormBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

//   ngOnInit(): void {
//     this.loginFrom = this.FormBuilder.group({
//       email:['', Validators.required],
//       password:['', Validators.required]
//     });
//   }
//   login(){
//     this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res=>{
//       const user = res.find((a:any) => {
//         return a.email === this.loginFrom.value.email && a.password === this.loginFrom.value.password
//       });
//       if (user) {
//         alert("Login Success");
//         this.loginFrom.reset();
//         this.router.navigate(['/dashboard']);
//       }
//       else {
//         alert("User not found");
//       }
//     }, err=>{
//       alert("Something went wrong")
//     })
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFrom!: FormGroup;
  public loggedInUser: any;
  public signupUsers: any[] = []; // Dữ liệu từ API signupUsers

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Lấy dữ liệu từ API signupUsers
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
      res => {
        this.signupUsers = res;
      },
      err => {
        console.error('Failed to fetch signupUsers:', err);
      }
    );
  }

  login() {
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.loginFrom.value.email && a.password === this.loginFrom.value.password;
      });
      if (user) {
        alert("Login Success");
        this.loggedInUser = user; // Set loggedInUser
        this.loginFrom.reset();
        this.router.navigate(['/dashboard']);
      } else {
        alert("User not found");
      }
    }, err => {
      alert("Something went wrong");
    });
  }

  logout() {
    this.loggedInUser = null; // Clear loggedInUser
  }
}
