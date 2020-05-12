import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.sass']
})
export class PageDashboardComponent {
    address: Address = addresses[0];
   
    public username: string;
    public entrepriseName: string;
    public orders: any [];
    public defaultAdress : any;
    constructor(public route: ActivatedRoute, public storeService: StoreService) {

        this.route.data.subscribe(data => {

            this.orders = data.initInfo[0];

            this.defaultAdress = data.initInfo[1];
        });
     }

    ngOnInit(): void {
       
        this.username = localStorage.getItem('username');
        this.entrepriseName = localStorage.getItem('entrepriseName');

    }

    findCountry(CountryId: number){
        return  this.storeService.countryList.find(p=>p.Id == CountryId).Country;
    }
}
