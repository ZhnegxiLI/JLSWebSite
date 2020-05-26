import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app--email-sended',
    templateUrl: './page-email-sended.component.html',
    styleUrls: ['./page-email-sended.component.scss']
})
export class PageEmailSendedComponent {
    public Message:string ="";

    constructor( 
        private loginService : LoginService, 
        private router: Router,
        private route: ActivatedRoute,
        private translateService: TranslateService) { }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params=>{
          if(params!=null && params.Email!=null){
              this.Message = this.translateService.instant('SendMessageTo').replace('{Email}',params.Email);
          }
          else{
              this.router.navigate(['/']);
          }
      })
        
    }
}
