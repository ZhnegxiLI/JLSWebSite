import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public host: string = environment.SERVER_API_URL;
    constructor(
        private http: HttpClient,
    ) { }

    private apiUrlGetOrdersListByUserId = this.host + 'api/Order/GetOrdersListByUserId';
    GetOrdersListByUserId(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetOrdersListByUserId, {params}).pipe(map((p:any)=>p.Data));
    }
}
