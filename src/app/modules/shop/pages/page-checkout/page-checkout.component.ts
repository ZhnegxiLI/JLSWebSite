import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RootService } from '../../../../shared/services/root.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './page-checkout.component.html',
    styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    public orderCriteria: any = {
        ShippingAdressId: 0,
        FacturationAdressId: 0,
        UserId: localStorage.getItem('userId'),
        References: [],
        ClientRemark: null,
        AcceptCondition: false
    };

    public facturationAddress: any = {};
    public shippingAddress: any[] = [];
    constructor(
        public root: RootService,
        public cart: CartService,
        private route: ActivatedRoute,
        private router: Router,
        public storeService: StoreService
    ) {

        this.route.data.subscribe(data => {
            this.facturationAddress = data.initInfo[0];
            this.orderCriteria.FacturationAdressId = this.facturationAddress.Id;
            this.shippingAddress = data.initInfo[1];
        });

        this.cart.items$.subscribe(p => {
            p.map(x => {
                this.orderCriteria.References.push(
                    {
                        ReferenceId: x.product.ReferenceId,
                        Quantity: x.quantity
                    }
                );
            })

        })
    }

    ngOnInit(): void {
        this.cart.quantity$.pipe(takeUntil(this.destroy$)).subscribe(quantity => {
            if (!quantity) {
                this.router.navigate(['../cart'], { relativeTo: this.route }).then();
            }
        });
    }

    selectedAddressChange(event: number) {
        this.orderCriteria.ShippingAdressId = event;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }


    findCountry(CountryId: number) {
        return this.storeService.countryList.find(p => p.Id == CountryId).Country;
    }

    ValideOrder(){
        console.log(this.orderCriteria)
    }
}
