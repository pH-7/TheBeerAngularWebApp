import {Component, OnInit} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search-beer',
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.scss']
})
export class SearchBeerComponent implements OnInit {

  termInput = new FormControl();

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
    var apiKey = "85da64206d0204d21eb1b57533d2e4f0";
    return this.http.get(`/api/v2/search?key=${apiKey}&type=beer&q=${term}`);
  }

  onKey(value) {
    console.log(value);
  }
}