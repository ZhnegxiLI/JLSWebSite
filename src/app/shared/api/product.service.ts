import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mergeMap, map } from 'rxjs/operators';

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

    private apiUrlGetProductListByPublishDate = this.host + 'api/Product/GetProductListByPublishDate';

    private apiUrlGetProductByPrice = this.host + 'api/Product/GetProductByPrice';

    private apiUrlGetProductListBySalesPerformance = this.host + 'api/Product/GetProductListBySalesPerformance';

    private apiUrlAdvancedProductSearchClient = this.host + 'api/Product/AdvancedProductSearchClient';

    private apiUrlGetProductById = this.host + 'api/Product/GetProductById';

    private apiUrlAddIntoProductFavoriteList = this.host + 'api/Product/AddIntoProductFavoriteList';

    private apiUrlGetFavoriteListByUserId = this.host + 'api/Product/GetFavoriteListByUserId';

    private apiUrlGetProductInfoByReferenceIds = this.host + 'api/Product/GetProductInfoByReferenceIds';

    GetCategoryForWebSite(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetCategoryForWebSite, { params });
    }

    GetProductInfoByReferenceIds(criteria): Observable<any> {
        return this.http.post(this.apiUrlGetProductInfoByReferenceIds, criteria);
    }

    AddIntoProductFavoriteList(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlAddIntoProductFavoriteList, { params });
    }

    GetFavoriteListByUserId(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetFavoriteListByUserId, { params }).pipe(map((p: any)=> p.List));
    }

    GetMainPageForWebSite(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetMainPageForWebSite, { params });
    }

    GetProductListByPublishDate(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetProductListByPublishDate, { params }).pipe(map((p: any) => p.Data.ProductListData));
    }

    GetProductByPrice(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetProductByPrice, { params }).pipe(map((p: any) => p.List));
    }

    GetProductListBySalesPerformance(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetProductListBySalesPerformance, { params }).pipe(map((p: any) => p.Data.ProductListData));
    }


    AdvancedProductSearchClient(criteria): Observable<any> {
        return this.http.post(this.apiUrlAdvancedProductSearchClient, criteria);
    }


    GetProductById(criteria): Observable<any> {
        let params = new HttpParams({ fromObject: criteria });
        return this.http.get(this.apiUrlGetProductById, { params });
    }
}
