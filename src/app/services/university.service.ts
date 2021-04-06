import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UniversityService {

  constructor(private http: HttpClient) { }

  public getById(id: number): Observable<any>{
    return this.http.get(environment.apiUrl + '/universities/get/' + id)
    .pipe(map((res: any) => res))
  }

  public getUniversities(filter: string): Observable<any> {
    return this.http.get<any[]>(environment.apiUrl + '/Universities/GetUniverstieswithStudentsCount',
        {
          params: new HttpParams()
          .set('filter', filter == null ? '' : filter)
        }
       )
    .pipe(map((res: any) => res))
  }

  public addUniversity(model: any){
    const body = JSON.stringify(model);
    const headers = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'});
    const options = {
      headers
    };
    return this.http.post(environment.apiUrl + '/universities/post', body,options);
  }

  public deleteUniversity(id: number){
    const headers = new HttpHeaders({'Content-Type':'application/json;charset=utf-8'});
    const options = {
      headers
    };
    return this.http.delete(environment.apiUrl + '/universities/delete/' + id,options);
  }

  public updateUniversity(id: number, model: any){
    const body = JSON.stringify(model);
        const headers = new HttpHeaders({'Content-Type':'application/json;charset=utf-8'});
        const options = {
            headers
        };
        return this.http.put(environment.apiUrl + '/universities/put/' + id,body,options);
  }
}
