import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project } from './Project';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html'
})

export class ProjectFormComponent {
  private project= new Project();

  constructor(
	private route: ActivatedRoute,
	private location: Location,
	private http: Http,
	@Inject('BASE_URL') private baseUrl: string
	) 
	{
	this.project= {'Name': '','Description': '','Requirements': ''};
	}

  public save() {
	this.http.put(this.baseUrl + 'api/projects', JSON.stringify(this.project))
	.subscribe(results => {
				this.location.back();
            }, error => {
                console.error(error);
            });
  }

  public goBack() {
    this.location.back();
  }

 }
