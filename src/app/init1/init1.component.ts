import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-init1',
  templateUrl: './init1.component.html',
  styleUrls: ['./init1.component.css']
})
export class Init1Component implements OnInit {

  lis: any[] = new Array();
  a;
  b;

  constructor(private http: Http, private route: ActivatedRoute,private router: Router) {}

  getData( ) {
    this.http.get('http://airporttracking.us-east-1.elasticbeanstalk.com/airports/getall')
      .subscribe(
        (response) => {
          console.log(response.json());
          for ( let i = 0; i < 4; i++) {
            this.lis.push({
              aname: response.json()[i].Airport_name,
              aid: response.json()[i].Airport_id,
              aloc: response.json()[i].location
            });
            console.log(this.lis[i]);
          }
        },
        (error) => console.log(error)
      );
  }
  onSelect($event) {
    this.a = $event;
    console.log('this is a: ' + this.a);
  }
  onSubmit1(){
    this.b = this.a;
    this.onSubmit(this.b);
  }
  onSubmit(val: any) {
    this.router.navigate(['/home',this.b]).then(
      nav => {console.log('sent value: '+this.b);
      },
      err => {console.log(err);
      });
  }

  ngOnInit() {
    this.getData();
  }

}
