import { Injectable } from '@angular/core';
import { ReferenceService } from '../api/reference.service'
import { TranslateService } from '@ngx-translate/core';
@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '';
    email = '';
    phone = '';
    hours = '';
    fax = '';
    get primaryPhone(): string | null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor(referenceService: ReferenceService, translateService: TranslateService) {
          //todo place into the behaviour subjet
        referenceService.GetReferenceItemsByCategoryLabels({
            ShortLabels: ['StoreInfomation'],
            Lang: translateService.currentLang
        }).subscribe(result => {
            if (result != null && result.length > 0) {
                this.address = result.find(p => p.Code == "StoreInfo_Address").Label;
                this.email = result.find(p => p.Code == "StoreInfo_Email").Label;
                this.phone = result.find(p => p.Code == "StoreInfo_Telephone").Label;
                this.hours = result.find(p => p.Code == "StoreInfo_Hour").Label;
                this.fax = result.find(p => p.Code == "StoreInfo_Fax").Label;
            }
        })
    }
}
