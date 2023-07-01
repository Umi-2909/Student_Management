import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Student } from '../models/Student';
import { Class } from '../models/Class';


@Injectable({
  providedIn: 'root',
})
export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getStudents() {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getClasses() {
    const url = `${this.REST_API_SERVER}/classes`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getStudent(studentId: number) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getClass(classId: number) {
    const url = `${this.REST_API_SERVER}/classes/` + classId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addStudent(data: Student) {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addClass(data: Class) {
    const url = `${this.REST_API_SERVER}/classes`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyStudent(studentId: number, data: Student) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyClass(classId: number, data: Class) {
    const url = `${this.REST_API_SERVER}/classes/` + classId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteStudent(studentId: number) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  public deleteClass(classId: number) {
    const url = `${this.REST_API_SERVER}/classes/` + classId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }

  public getProfile() {
    const url = `${this.REST_API_SERVER}/profile`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  public getStudentsByClassName(className: string): Observable<Student[]> {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient.get<Student[]>(url, this.httpOptions).pipe(
      map(students => students.filter(student => student.className === className)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
