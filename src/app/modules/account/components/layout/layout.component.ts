import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.sass']
})
export class LayoutComponent {
    links: {label: string; url: string, type?: string}[] = [
        {label: 'Dashboard', url: './dashboard'},
        {label: 'Edit Profile', url: './profile'},
        {label: 'Order History', url: './orders'},
        {label: 'Order Details', url: './orders/5'},
        {label: 'Addresses', url: './addresses'},
        {label: 'Edit Address', url: './addresses/5'},
        {label: 'Password', url: './password'},
        {label: 'Logout', url: './login', type:'logout'}
    ];

    constructor(private loginService: LoginService) { }

    logout(){
        this.loginService.logout();
    }
}
