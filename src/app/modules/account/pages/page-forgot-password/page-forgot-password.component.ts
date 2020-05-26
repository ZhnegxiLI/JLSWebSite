import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/api/user.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './page-forgot-password.component.html',
    styleUrls: ['./page-forgot-password.component.scss']
})
export class PageForgotPasswordComponent {
    public email: string;
    public loading: boolean = false;

    constructor(private loginService: LoginService,
        private toastr: ToastrService,
        private router: Router,
        private translateService: TranslateService,
        private userService: UserService) { }

    ngOnInit(): void {
    }

    sendEmail() {
        if (this.email != null && this.email != '') {

            this.loading = true;
            // this.navCtrl.parent.select(0); // 跳转tabs
            this.userService.SendPasswordResetLink({ username: this.email }) // 填写url的参数
                .subscribe(
                    f => {
                        if (f != null && f.Success == true) {
                            // todo redirecte to page
                            this.toastr.success(this.translateService.instant("forget-password.EmailSendSuccessfully"));
                            this.router.navigate(['account/emailreset'], { queryParams: { Email: f.Data } });
                        }
                        else {
                            this.toastr.error(this.translateService.instant("forget-password.AccountNotExists"));
                        }

                        this.loading = false;
                    },
                    error => {
                        this.toastr.error(this.translateService.instant("Msg_Error"));
                    });
        }

    }
}
