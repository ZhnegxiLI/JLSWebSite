import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    public isLogined: boolean = false;
    public email: string;
    public password: string;
    constructor(
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.loginService.loginStatus.subscribe(p => this.isLogined = p);

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
                this.loginService.loginStatus.next(true);
            }
            else {
                // todo show error message
            }
        },
            error => {
                // todo
                if (error.Body != null && error.Body.LoginError != null) {
                    // todo show error message
                    // this.matSnackBar.open( this._translateService.instant(err.Body.LoginError), 'OK', { 
                    //     duration: 2000
                    // });
                }
                else {
                    // todo show error message
                    // // this.matSnackBar.open(this._translateService.instant("Msg_Error") , 'OK', { 
                    // //     duration: 2000
                    // // });
                }
            });
    }

    logout() {
        this.loginService.logout();
    }
}
