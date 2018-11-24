import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from "../model/user";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/shareReplay';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
    token: string = '';

    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('jwt');
        if (this.token) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
            headers.append('Authorization', this.token);
            this.http.get('http://localhost:3001/api/user', { headers: headers }).subscribe((user: any) => {
                if (user) return this.user.next(user.user);
                else {
                    this.user.next(undefined);
                    this.token = ''; // should handle and redirect to login
                }
            })
        }
    }

    register(user) {
        return this.http.post('http://localhost:3001/api/register', user).pipe(map((user: any) => user.user))
            .do((user: User) => {
                this.setToken(user.token);
                this.user.next(user);
            })
            .shareReplay();
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3001/api/login', { email: email, password: password }).pipe(map((user : any) => user.user))
            .do((user: User) => {
                this.setToken(user.token);
                this.user.next(user);
            })
            .shareReplay();
    }

    logout() {
        localStorage.removeItem('jwt');
        this.token = '';
        this.user.next(undefined);
    }

    setToken(token) {
        localStorage.setItem('jwt', token)
    }
}
