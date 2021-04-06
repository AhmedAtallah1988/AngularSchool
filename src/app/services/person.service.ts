import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient) { }

  public getById(id: number):Observable<any>{
    return this.http.get<any>(environment.apiUrl + '/person/get/' + id)
    .pipe(map((res: any) => res))
  }

  public getPerson(filter: string, pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get<any[]>(environment.apiUrl + '/person/get',
       {
         params: new HttpParams()
         .set('filter', filter == null ? '' : filter)
         .set('pageNumber', pageIndex.toString())
         .set('pageSize', pageSize.toString())
       }
       )
    .pipe(map((res: any) => res))
}

  public addPerson(model: any){
    const body = JSON.stringify(model);
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
    const options = {
      headers
    };
    return this.http.post(environment.apiUrl + '/person/post', body,options);
  }

  public deletePerson(id: number){
    const headers = new HttpHeaders({'Content-Type':'application/json;charset=utf-8'});
    const options = {
      headers
    };
    return this.http.delete(environment.apiUrl + '/person/delete/' + id,options);
  }

  public updatePerson(id: number, model: any){
    const body = JSON.stringify(model);
        const headers = new HttpHeaders({'Content-Type':'application/json;charset=utf-8'});
        const options = {
            headers
        };
        return this.http.put(environment.apiUrl + '/person/put/' + id,body,options);
  }
}
