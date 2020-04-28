import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReferenceService {
    public host: string = environment.SERVER_API_URL;
    constructor(
        private http: HttpClient,
    ) { }

    private apiUrlGetReferenceItemsByCategoryLabels = this.host + 'api/Reference/GetReferenceItemsByCategoryLabels';

    GetReferenceItemsByCategoryLabels(criteria): Observable<any> {
        return this.http.post(this.apiUrlGetReferenceItemsByCategoryLabels, criteria);
    }
}
