


import { Injectable } from "@angular/core";
import { RequestOptions, Response, Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from "environments/environment.prod";

@Injectable()
export class TodayTaskServices {
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;

    constructor(private http: Http) { }










    getTaskType(obj: any) {

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });

        return this.http
            .post(this.baseResUrl+`/getTaskType`, obj, options).map((res: Response) => res.json());

    }


}