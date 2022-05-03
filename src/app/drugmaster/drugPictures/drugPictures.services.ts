import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class drugpicService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private getFileuploadedURL = this.baseResUrl+'/modifyuploadphoto';
  constructor(private http1: HttpClient) {}

  pushFileToStorage(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.getFileuploadedURL + '/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http1.request(req);
  }
}
