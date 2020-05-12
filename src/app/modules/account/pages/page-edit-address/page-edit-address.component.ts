import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/api/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-page-edit-address',
    templateUrl: './page-edit-address.component.html',
    styleUrls: ['./page-edit-address.component.scss']
})
export class PageEditAddressComponent {
    public adressForm: FormGroup;
    constructor(public route: ActivatedRoute, private formBuilder: FormBuilder, private userService: UserService,
        private toastr: ToastrService) {

        this.adressForm = this.formBuilder.group({
            Id: [''],
            EntrepriseName: ['', Validators.required],
            ContactFirstName: ['', Validators.required],
            ContactLastName: ['', Validators.required],
            FirstLineAddress: ['', Validators.required],
            SecondLineAddress: [''],
            City: ['', Validators.required],
            CountryId: [''],
            ZipCode: ['', Validators.required],
            ContactTelephone: ['', Validators.required],
            ContactFax: [''],
            Provence: [''],
            IsDefaultAdress: [''],
            CreatedOn: [''],
            CreatedBy: [''],
            UpdatedOn: [''],
            UpdatedBy: ['']
        });

        this.route.data.subscribe(data => {
            // data.initInfo;
            this.adressForm.patchValue(data.initInfo);
        });
    }

    save() {
        if (this.adressForm.invalid) {
            return;
        }

        var criteria = {
            adress: this.adressForm.value,
            userId: localStorage.getItem('userId'),
            type: 'shippingAdress'
        }
        this.userService.CreateOrUpdateAdress(criteria).subscribe(result => {
            this.toastr.success('Save successfully') // todo translate
        },
            error => {

            })

    }
}
