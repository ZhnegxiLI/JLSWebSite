import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    public host: string = environment.SERVER_API_URL;
    constructor(
        private http: HttpClient,
    ) { }

    private apiUrlSaveMessage = this.host + 'api/Message/SaveMessage';


    GetReferenceItemsByCategoryLabels(criteria): Observable<any> {
        return this.http.post(this.apiUrlSaveMessage, criteria);
    }
}
