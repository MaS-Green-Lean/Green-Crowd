import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../model/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class StoreService {

    constructor(private http: HttpClient) { }

    getStoreById(id: string) {
        return this.http.get('http://localhost:3001/api/store/' + id);
    }

    getAllStores() {
        return this.http.get('http://localhost/api/stores');
    }
}