import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { mergeMap, map } from 'rxjs/operators';
import { AppConfigService } from 'src/app/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class ExportService {
    public host: string = this.appconfigService.getUrl(); // environment.SERVER_API_URL;
    constructor(
        private http: HttpClient,
        public appconfigService: AppConfigService
    ) { }

    private apiUrlExportAction = this.host + 'api/Export/ExportAction';

    ExportAction(criteria): Observable<any> {
        return this.http.post(this.apiUrlExportAction, criteria);
    }

}
