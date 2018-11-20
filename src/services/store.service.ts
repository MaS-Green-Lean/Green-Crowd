import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../model/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/map";

@Injectable()
export class StoreService {

    constructor(private http: HttpClient) { }

    getStoreById(id: string) {
        return this.http.get<Store>('https://green-lean.herokuapp.com/api/store/' + id)
    }

    getAllStores() {
        return this.http.get<Store[]>('https://green-lean.herokuapp.com/api/stores')
    }
}