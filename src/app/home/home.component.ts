import {Component, OnInit} from '@angular/core';
import {Http, Headers} from "@angular/http";
import { AppModule } from '../app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // Default value
  data = {
    image: '',
    name: '',
    description: '',
    createDate: ''
  };

  constructor(private http: Http) {
  }

  ngOnInit() {
    console.log('Home init');
    let header = new Headers();
    header.set('Content-type', 'application/json');
    this.http.get(`/api/v2/beer/random?key=${AppModule.apiKey}&hasLabels=Y`, header).subscribe(
        response => {
          let json = response.json();
          this.data.name = json.data.nameDisplay;
          this.data.description = json.data.style.description;
          this.data.image = json.data.labels.medium;
        }
    )
  }
}