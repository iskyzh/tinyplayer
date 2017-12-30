import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerlistService {

  constructor(private http: Http) { }

  public getList() {
    return this.http.get('/assets/sound.json')
      .map(response => response.json());
  }
}
