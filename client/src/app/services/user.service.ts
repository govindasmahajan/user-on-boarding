import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    /* Error Handler  */

    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    /* Add New User to the DB */
    createUser(data): Observable<User> {
        return this.http.post<User>(`${environment.baseURL}/user/add-user`,
            JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandler))
    }

    getUserList(): Observable<User> {
        return this.http.get<User>(`${environment.baseURL}/user/list-users`)
            .pipe(retry(1), catchError(this.errorHandler))
    }
}
