import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/api/user.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-reset-password',
    templateUrl: './page-reset-password.component.html',
    styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent {
    public loading: boolean = false;
    basicInfoForm: FormGroup;


    constructor(private loginService: LoginService,
        private toastr: ToastrService,
        private router: Router,
        public formBuilder: FormBuilder,
        private translateService: TranslateService,
        private userService: UserService) {

        this.basicInfoForm = this.formBuilder.group({
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confirmPassword: ['', Validators.required]
        });


    }

    ngOnInit(): void {
    }

    confirmPassword() {
        let password = this.basicInfoForm.get('password').value;
        let confirmPassword = this.basicInfoForm.get('confirmPassword').value;
        return password != confirmPassword;
    }

    resetPassword(){
        if(this.basicInfoForm.invalid){
            return;
        }
        // todo reset password service 
    }


    get basicInfoFormCtrl() { return this.basicInfoForm.controls; }

}
