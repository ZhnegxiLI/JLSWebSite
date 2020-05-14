import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
    public email: string;
    public password: string;

    constructor( private loginService : LoginService, private router: Router) { }

    login() {
        this.loginService.login(this.email, this.password).subscribe(result=>{
            if(result!=null && result.authToken!=null){
                localStorage.setItem('loginStatus', '1');
                localStorage.setItem('jwt', result.authToken.token);
                localStorage.setItem('username', result.authToken.username);
                localStorage.setItem('userId',result.authToken.userId);
                localStorage.setItem('expiration', result.authToken.expiration);
                localStorage.setItem('userRole', result.authToken.roles);
                localStorage.setItem('refreshToken', result.authToken.refresh_token);
                localStorage.setItem('entrepriseName', result.authToken.entrepriseName);
                
                this.loginService.loginStatus.next(true);

                this.router.navigate(['/account/dashboard']);
            }
            else{
                // todo show error message
            }
        },
        error=>{
            // todo
            if(error.Body!=null && error.Body.LoginError!=null){
                // todo show error message
            // this.matSnackBar.open( this._translateService.instant(err.Body.LoginError), 'OK', { 
            //     duration: 2000
            // });
        }
        else{
            // todo show error message
            // // this.matSnackBar.open(this._translateService.instant("Msg_Error") , 'OK', { 
            // //     duration: 2000
            // // });
        }
        });
    }

    ngOnInit(): void {
        this.loginService.loginStatus.subscribe(p => p? this.router.navigate(['/account/dashboard'])  : null );

    }
}
