import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'student',
    templateUrl: './student-info.component.html'
})
export class StudentInfo {
    public student: Student;
	private studentID:number;
	
    constructor(private route: ActivatedRoute, http: Http, @Inject('BASE_URL') baseUrl: string) {

		route.params.subscribe((params: Params) => this.studentID = +params['id']);

        http.get(baseUrl + 'api/student?id='+ this.studentID).subscribe(result => {
            this.student = result.json() as Student;
        }, error => console.error(error));
    }
}

export interface Student {
	id: number;
    name: string;
    dateOfBirth: Date;
	email:string;
	matricola:string;
}
