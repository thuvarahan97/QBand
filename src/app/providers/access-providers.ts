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
        // let headers = new HttpHeaders({
            // 'Content-Type': 'application/json; charset=UTF-8'
        // });

        // let options = {
        //     headers: headers
        // }

        return this.http.post(this.server + file, JSON.stringify(body))
        .timeout(59000)
        .map(res => res);
    }

    getData(file){
        // let headers = new HttpHeaders({
            // 'Content-Type': 'application/json; charset=UTF-8'
        // });

        // let options = {
        //     headers: headers
        // }

        // const params = new HttpParams()
        //     .set('orderBy', '"$key"')
        //     .set('limitToFirst', "1");

        return this.http.get(this.server + file)
        .timeout(59000)
        .map(res => res);
    }
}