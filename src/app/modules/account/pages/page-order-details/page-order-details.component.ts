import { Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { order } from '../../../../../data/account-order-details';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
    selector: 'app-page-order-details',
    templateUrl: './page-order-details.component.html',
    styleUrls: ['./page-order-details.component.scss']
})
export class PageOrderDetailsComponent {
    order: any = {};
    taxRate : number = 0;
    constructor(public route: ActivatedRoute, public storeService: StoreService) {
        this.route.data.subscribe(data => {
            this.order = data.initInfo;
        });
    }
    ngOnInit(): void {
       this.storeService.taxRate.subscribe(p=>this.taxRate = p);
    }
}
