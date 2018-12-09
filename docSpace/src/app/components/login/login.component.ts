import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormControl,FormGroup,FormBuilder,Validators,NgForm} from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbCarouselConfig]
})
export class LoginComponent implements OnInit {
  email : string;
  password : string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    config: NgbCarouselConfig
  ) {
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = true;
  }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      email :this.email,
      password : this.password,
    }
    // console.log(this.email);
    
    this.authService.authenticateUser(user).subscribe((data : any )=> {
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        // this.flashMessage.show(data.msg ,{cssClass:'alert-success', timeout:3000});
        this.router.navigate(['/home']); 
      }else{
        this.flashMessage.show(data.msg ,{cssClass:'alert-danger', timeout:3000});
        this.router.navigate(['/login']);      
      }
      
       console.log(this.email);
    });

  }

}
