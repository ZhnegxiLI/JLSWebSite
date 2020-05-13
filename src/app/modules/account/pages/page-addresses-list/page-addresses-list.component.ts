import { Component } from '@angular/core';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserService } from 'src/app/shared/api/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-page-addresses-list',
    templateUrl: './page-addresses-list.component.html',
    styleUrls: ['./page-addresses-list.component.sass']
})
export class PageAddressesListComponent {
    addresses: any[] = [];

    constructor(public route: ActivatedRoute, public storeService: StoreService, public addressService: UserService,
        private toastr: ToastrService, private router: Router, public userService: UserService) {

        this.route.data.subscribe(data => {
            this.addresses = data.initInfo;

        });
    }


    remove(Id: number) {
        if (this.addresses.length > 1) {
            this.addressService.RemoveShippingAddress({ AddressId: Id }).subscribe(result => {
                if (result > 0) {
                    this.toastr.success('Save successfully') // todo translate
                    this.refreshData();
                }
                else {
                    this.toastr.error("Some error is occured");
                }
            },
                error => {

                });
        }
    }

    refreshData(){
        this.userService.GetUserShippingAdress({
            UserId: localStorage.getItem('userId')
        }).subscribe(p=>this.addresses =p);
    }


    findCountry(CountryId: number) {
        return this.storeService.countryList.find(p => p.Id == CountryId).Country;
    }
}
