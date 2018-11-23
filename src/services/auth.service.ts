import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3001/api/login', { email: email, password: password })
            .do(user => this.setToken(user))
            .shareReplay();
    }

    setToken(user) {
        localStorage.setItem('jwt', user.token)
    }
}
