import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public singupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.singupForm = this.formBuilder.group({
      fullname:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      mobile:['', Validators.required],
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers",this.singupForm.value)
    .subscribe(rest=>{
      alert("Sign Up Success");
      this.singupForm.reset();
      this.router.navigate(['/login']);
    },err=>{
      alert("Something went wrong")
    })
  }
}
