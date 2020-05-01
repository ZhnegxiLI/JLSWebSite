import { Injectable } from '@angular/core';
import { ReferenceService } from '../api/reference.service'
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '';
    email = '';
    phone = '';
    hours = '';
    fax = '';

    public categoryList = new BehaviorSubject<any[]>([]);
    public storeInfo = new BehaviorSubject<any[]>([]);
    public mainPageProductInfo = new BehaviorSubject<any[]>([]);
    public slideList = new BehaviorSubject<any[]>([]);

    constructor(referenceService: ReferenceService, translateService: TranslateService) {
        // todo add into a global service, change when we change language
        this.storeInfo.subscribe(result => {
            if (result != null && result.length > 0) {
                this.address = result.find(p => p.Code == "StoreInfo_Address").Label;
                this.email = result.find(p => p.Code == "StoreInfo_Email").Label;
                this.phone = result.find(p => p.Code == "StoreInfo_Telephone").Label;
                this.hours = result.find(p => p.Code == "StoreInfo_Hour").Label;
                this.fax = result.find(p => p.Code == "StoreInfo_Fax").Label;
            }
        });
    
    }

}
