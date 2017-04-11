import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-search-beer',
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.scss']
})
export class SearchBeerComponent implements OnInit {

  termInput: FormControl = new FormControl();

  beerList: any[];


  constructor(private http: Http) {
  }

  ngOnInit() {
    this.termInput.valueChanges.switchMap(term => {
      return this.search(term);
    }).subscribe(response => {
      this.beerList = response.json().data;
    });
  }

  search(term) {
    return this.http.get(`/api/v2/search?key=${AppModule.apiKey}&type=beer&q=${term}`);
  }

  onKey(value) {
    console.log(value);
  }
}