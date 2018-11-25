import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '../model/store';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/map";
import { AuthService } from './auth.service';

@Injectable()
export class StoreService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    getStoreById(id: string) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
        console.log(headers)
        return this.http.get<Store>('https://green-lean.herokuapp.com/api/store/' + id, { headers: headers });
    }

    getAllStores() {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
        return this.http.get<Store[]>('https://green-lean.herokuapp.com/api/stores', { headers: headers })
    }

    getLowestPrice() {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
        return this.http.get('https://green-lean.herokuapp.com/api/produce', { headers: headers });
    }
}