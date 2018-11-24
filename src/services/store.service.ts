import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../model/store';
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

    getLowestPrice() {
        return this.http.get('https://green-lean.herokuapp.com/api/produce');
    }
}