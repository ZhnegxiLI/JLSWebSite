import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/api/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-page-password',
    templateUrl: './page-password.component.html',
    styleUrls: ['./page-password.component.sass']
})
export class PagePasswordComponent {
    public criteria : any = {
        PreviousPassword: '',
        NewPassword:'',
        RepeateNewPassword:''
    }
    constructor(public userService: UserService,private toastr: ToastrService) { }

    public checkValidity(){
        if(this.criteria.PreviousPassword!="" && this.criteria.NewPassword!="" && this.criteria.RepeateNewPassword!=""){
            return true;
        }
        return false;
    }

    public save(){
        if(this.checkValidity() && this.criteria.NewPassword == this.criteria.RepeateNewPassword && this.criteria.NewPassword.length>=8){
            this.userService.UpdatePassword({
                UserId: localStorage.getItem('userId'),
                NewPassword: this.criteria.NewPassword,
                PreviousPassword: this.criteria.PreviousPassword
            }).subscribe(result=>{
                if(result>0){
                    this.toastr.success("Successfully modified")
                }
                else{

                }
            })
        }
    }
}
