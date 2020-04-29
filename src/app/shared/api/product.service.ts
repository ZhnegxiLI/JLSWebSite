import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public host: string = environment.SERVER_API_URL;
    constructor(
        private http: HttpClient,
    ) { }

    private apiUrlGetCategoryForWebSite = this.host + 'api/Product/GetCategoryForWebSite';

    private apiUrlGetMainPageForWebSite = this.host + 'api/Product/GetMainPageForWebSite';

    GetCategoryForWebSite(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetCategoryForWebSite, {params});
    }

    GetMainPageForWebSite(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetMainPageForWebSite, {params});
    }
}
