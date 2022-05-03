import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
@Injectable()
export class assignModuleService {
  constructor(private http: Http) {}
  private moduleURL='api/getAssignModule';
getModules(id:number)
{
  return this.http.get(this.moduleURL+'/'+id).map(res=>res.json());
}

}
