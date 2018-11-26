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

    deleteProducebyId(id) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
        return this.http.delete('https://green-lean.herokuapp.com/api/produce/' + id, { headers: headers });
    }

    updateProduceById(id, produce) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
        return this.http.patch('https://green-lean.herokuapp.com/api/produce/' + id, produce , { headers: headers });
    }

    createProduce(storeId, produce) {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.token);
        return this.http.post('https://green-lean.herokuapp.com/api/store/' + storeId + '/produce', produce, { headers: headers });
    }
}