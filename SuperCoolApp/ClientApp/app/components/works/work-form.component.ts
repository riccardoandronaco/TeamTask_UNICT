import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Work } from './Work';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'work-form',
  templateUrl: './work-form.component.html',
  //styleUrls: ['./work-form.component.css']
})

export class WorkFormComponent {

  private work= new Work();
  private IdProject: number;

  constructor(
	private route: ActivatedRoute,
	private location: Location,
	private http: Http,
	@Inject('BASE_URL') private baseUrl: string
	) 
	{
	this.route.params.subscribe((params: Params) => this.IdProject = +params['id']);
	this.work= {'IdProject': this.IdProject,'Name': '','Allegati': '','Status': 'Waiting'};
	}

  public save() {
	//let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
	//var str = "{'Name': 'testnome', 'IdProject': 2}"; esempio di stringa da inserire in http.put
	//JSON.stringify(this.work)
	this.http.put(this.baseUrl + 'api/works', JSON.stringify(this.work))
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
