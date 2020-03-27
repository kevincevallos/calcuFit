import { Injectable } from '@angular/core';
import { toArray } from "rxjs/operators";
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "https://api.spoonacular.com/recipes";


@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrldos = "https://api.spoonacular.com/recipes";

  //apiUrl = 'http://apihubre.herokuapp.com/api/clientes';

  constructor(public http: HttpClient) { 
    console.log('Hello RestServiceProvider Provider');
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  /*searchObjects() {
    return this.http.get(this.apiUrl).pipe(
        // convert object to array
        toArray()
    );
  }*/

//CRUD
getClassroom(): Observable<any> {
  return this.http.get(apiUrl, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

getClassroomById(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}

postClassroom(data): Observable<any> {
  const url = `${apiUrl}/add_with_students`;
  return this.http.post(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

updateClassroom(id: string, data): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.put(url, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

deleteClassroom(id: string): Observable<{}> {
  const url = `${apiUrl}/${id}`;
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}
//fin CRUD

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrldos).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrldos+'/clientes', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
