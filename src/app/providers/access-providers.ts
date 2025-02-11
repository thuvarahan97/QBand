import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {
    //url backend api json
    // server: string = 'http://localhost/QBand/';

    constructor(
        public http: HttpClient
    ) { }

    postData(body, file){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        });

        let options = {
            headers: headers
        }

        return this.http.post(this.server + file, JSON.stringify(body), options)
        .timeout(5000)
        .map(res => res);
    }

    getData(file){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
        });

        let options = {
            headers: headers
        }

        // const params = new HttpParams()
        //     .set('orderBy', '"$key"')
        //     .set('limitToFirst', "1");

        return this.http.get(this.server + file, options)
        .timeout(5000)
        .map(res => res);
    }
}