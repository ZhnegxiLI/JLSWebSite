import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    public isLogined: boolean = false;
    public username: string;
    public entrepriseName: string;
    public email: string;
    public password: string;
    constructor(
        private loginService: LoginService,
        private toastr: ToastrService,
        private translateService: TranslateService
    ) { }

    ngOnInit(): void {
        this.loginService.loginStatus.subscribe(p => this.isLogined = p);
        this.username = localStorage.getItem('username');
        this.entrepriseName = localStorage.getItem('entrepriseName');
    }

    login() {
        this.loginService.login(this.email, this.password).subscribe(result => {
            if (result != null && result.authToken != null) {
                localStorage.setItem('loginStatus', '1');
                localStorage.setItem('jwt', result.authToken.token);
                localStorage.setItem('username', result.authToken.username);
                localStorage.setItem('userId', result.authToken.userId);
                localStorage.setItem('expiration', result.authToken.expiration);
                localStorage.setItem('userRole', result.authToken.roles);
                localStorage.setItem('refreshToken', result.authToken.refresh_token);
                localStorage.setItem('entrepriseName', result.authToken.entrepriseName);
                this.loginService.loginStatus.next(true);
            }
            else {
                this.toastr.error(this.translateService.instant("Msg_Error"));
            }
        },
            error => {
                var message = error.error;
                if (message.LoginError != null) {

                    this.toastr.error(this.translateService.instant(message.LoginError));
                }
                else {
                    this.toastr.error(this.translateService.instant("Msg_Error"));
                }
            });
    }

    logout() {
        this.loginService.logout();
    }
}
