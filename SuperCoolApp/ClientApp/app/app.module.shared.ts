import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes , RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { WorksComponent } from './components/works/works.component';
import { WorkFormComponent } from './components/works/work-form.component';
import { ProjectFormComponent } from './components/projects/project-form.component';
import { StudentInfo } from './components/students/student-info.component';



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        StudentsComponent,
		ProjectsComponent,
		WorksComponent,
		WorkFormComponent,
		ProjectFormComponent,
		StudentInfo
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
		ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'students', component: StudentsComponent },
			{ path: 'projects', component: ProjectsComponent },
			{ path: 'projects/:id/addwork', component: WorkFormComponent, pathMatch: 'full'},            
			{ path: 'projects/newProject', component: ProjectFormComponent, pathMatch: 'full'},            
			{ path: 'projects/:id', component: WorksComponent, pathMatch: 'full' },
			{ path: 'student/:id', component: StudentInfo, pathMatch: 'full' },
			{ path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
