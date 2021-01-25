import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './appConfig';
import { environment } from './../environments/environment';

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;
  private baseUrl: string ='';

  constructor(private http: HttpClient) { 
    if(environment.production==false && environment.baseUrl!=null){
      this.baseUrl = environment.baseUrl;
    }
  }

  loadAppConfig() {
    return this.http.get<AppConfig>( this.baseUrl+'/configuration/appConfig.json')
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

  async getAsyncUrl(){
   var appConfig = await this.http.get<AppConfig>(this.baseUrl+'/configuration/appConfig.json')
      .toPromise();
    return appConfig.SERVER_API_URL;
  }
}