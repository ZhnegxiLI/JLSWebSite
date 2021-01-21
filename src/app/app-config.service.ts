import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './appConfig';

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get<AppConfig>('/configuration/appConfig.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  getConfig() {
    return this.appConfig;
  }

  getUrl(){
    return this.appConfig.SERVER_API_URL;
  }
}