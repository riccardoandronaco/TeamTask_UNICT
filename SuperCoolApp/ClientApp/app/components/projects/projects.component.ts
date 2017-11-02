import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';


@Component({
    selector: 'projects',
    templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
    public projects: Project[];
	//get list of projects
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, public location:Location) {
        http.get(baseUrl + 'api/projects').subscribe(result => {
            this.projects = result.json() as Project[];
        }, error => console.error(error));
    }

	public delete(id:number){
	this.http.delete(this.baseUrl + 'api/projects?id='+id).subscribe(result => {
            location.reload();
        }, error => console.error(error));
	}
}

interface Project {
	id: string,
    name: string;
	deadLine: string,
}


