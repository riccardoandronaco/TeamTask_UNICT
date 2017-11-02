import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
//import { Work } from './Work';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Student} from '../students/students.component';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {FormGroup, FormBuilder, Validators, FormControlName} from '@angular/forms';

@Component({
    selector: 'works',
    templateUrl: './works.component.html',
	styleUrls: ['./works.component.css']
})

export class WorksComponent{
    //public works: Work[];
	public works_waiting: Work[];
	public works_assigned: Work[];
	public works_completed: Work[];
	public students: Student[];

	public projectID: number;
	private to_assign: number;
	private show_to_assign : boolean = false;
	public assign_work:FormGroup;
	private current_work : Work;
	private current_student: Student;
	
    constructor(public route: ActivatedRoute,private location: Location,private http: Http, @Inject('BASE_URL') private baseUrl: string,private formBuilder: FormBuilder) {
		//get projectID from query url		
		this.route.params.subscribe((params: Params) => this.projectID = +params['id']);
        
		/*http.get(baseUrl + 'api/works?id=' + this.projectID).subscribe(result => {
            this.works = result.json() as Work[];
        }, error => console.error(error));*/

		//get works that are in Waiting State
		http.get(baseUrl + 'api/workStatus?status=Waiting&id=' + this.projectID).subscribe(result => {
            this.works_waiting = result.json() as Work[];
        }, error => console.error(error));

		//get works that are in Assigned State
		http.get(baseUrl + 'api/workStatus?status=Assigned&id=' + this.projectID).subscribe(result => {
            this.works_assigned = result.json() as Work[];
        }, error => console.error(error));

		//get works that are in Completed State
		http.get(baseUrl + 'api/workStatus?status=Completed&id=' + this.projectID).subscribe(result => {
            this.works_completed = result.json() as Work[];
        }, error => console.error(error));

		//get students
		http.get(baseUrl + 'api/students').subscribe(result => {
            this.students = result.json() as Student[];
        }, error => console.error(error));
    }

	public delete(workid: number){
	this.http.delete(this.baseUrl + 'api/works?id=' + workid)
	.subscribe(results => {
				location.reload();
            }, error => {
                console.error(error);
            });
  }

	public show_modal(work_id:number){
		this.to_assign=work_id;
		this.http.get(this.baseUrl + 'api/work?id=' + work_id).subscribe(result => {
            this.current_work = result.json() as Work;
        }, error => console.error(error));
		this.show_to_assign=true;	
	}

	public assign(){
	//assign a Student_id to Work
	this.assign_work=this.formBuilder.group({
		Id: this.to_assign,
		Name: this.current_work.name,
		Status: 'Assigned',
		Allegati: this.current_work.allegati,
		idProject: this.current_work.idProject,
		Student_Id: 1    
		});
		let assigned_work = this.assign_work.value as Work;
		this.http.post(this.baseUrl + 'api/works', JSON.stringify(assigned_work))
		.subscribe(results => {
				location.reload();
            }, error => {
                console.error(error);
            });
	}

	public complete(work_id:number){
		this.http.get(this.baseUrl + 'api/work?id=' + work_id).subscribe(result => {
        this.current_work = result.json() as Work;
		this.assign_work=this.formBuilder.group({
		Id: this.current_work.id,
		Name: this.current_work.name,
		Status: 'Completed',
		Allegati: this.current_work.allegati,
		idProject: this.current_work.idProject,
		student_Id: this.current_work.student_Id    
		});
		let completed_work = this.assign_work.value as Work;
		this.http.post(this.baseUrl + 'api/works', JSON.stringify(completed_work))
		.subscribe(results => {
				location.reload();
            }, error => {
                console.error(error);
            });

        }, error => console.error(error));
	}

	/*public StudentfromId(){
	this.http.get(this.baseUrl + 'api/student?id=' + 2).subscribe(result => {
           this.current_student = result.json() as Student;
        }, error => console.error(error));
		if(this.current_student==null) return "nulla";
		else return this.current_student.name;
	}*/
}

export interface Work {
  id: number;
  name: string;
  allegati: string;
  status: string;
  idProject: number;
  student_Id:number;
}