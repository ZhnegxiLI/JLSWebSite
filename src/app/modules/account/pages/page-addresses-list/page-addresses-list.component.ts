import { Component } from '@angular/core';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
    selector: 'app-page-addresses-list',
    templateUrl: './page-addresses-list.component.html',
    styleUrls: ['./page-addresses-list.component.sass']
})
export class PageAddressesListComponent {
    addresses: any[] = [];

    constructor(public route: ActivatedRoute, public storeService: StoreService) {

        this.route.data.subscribe(data => {
            this.addresses = data.initInfo;

        });
    }

    add(){

    }
    
    remove(Id: number){
        // todo create service 
    }


    findCountry(CountryId: number) {
        return this.storeService.countryList.find(p => p.Id == CountryId).Country;
    }
}
