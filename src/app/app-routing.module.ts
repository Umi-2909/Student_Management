import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentsComponent } from './students/students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassFormComponent } from './class-form/class-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'student-form/:id', component: StudentFormComponent },
  { path: 'class-form/:id', component: ClassFormComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
