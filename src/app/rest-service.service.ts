import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const urlGeneral = "http://localhost:8080/api/";
const urlEnemy = "http://localhost:8080/api/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient) {
    
   }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getBattlefield(): Observable<any> {
    return this.http.get(urlGeneral + 'getBattlefield').pipe(
      map(this.extractData));
  }

  getImpacts(): Observable<any> {
    return this.http.get(urlGeneral + 'getImpacts').pipe(
      map(this.extractData));
  }
  
  evaluateImpact(x:number,y:number): Observable<any> {
    const ur_eval = `http://localhost:8080/api/evaluateImpact?x=${x}&y=${y}`;// url servicio enemigo
    return this.http.get(ur_eval).pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
