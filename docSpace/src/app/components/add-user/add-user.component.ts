import { Component, OnInit } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router';
//import {FormControl,FormGroup,FormBuilder,Validators,NgForm} from '@angular/forms';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  // registerForm : FormGroup;

  fullname: String;
  dob: Date;
  nic:String;
  gender: String;
  phoneNo: String;
  address:any;
  address1:any;
  address2:any;
  city:String;
  province:String;
  postalcode:any;
  email:String;
  emp_id : String;
  role : String;
  level : String;
 // success: Object;

    constructor(
      private validateService: ValidateService,
      private authService: AuthService,
      private router: Router,
      private flashMessage: FlashMessagesService
    ){}

  // constructor(private auth:AuthServiceService,private router:Router) {
  //   this.registerForm = {
  //     empId:['',Validators.required],
  //     role:['',Validators.required],
  //     level:['',Validators.required]
  //   };
  // }

  ngOnInit() {
  }

  
  onSubmit(){
    //console.log(this.fullname);
    // const today = new Date();
    const user = {
      fullname: this.fullname,
      dob: this.dob,
      nic: this.nic,
      gender: this.gender,
      phoneNo: this.phoneNo,
      address:this.address,
      address1:this.address1,
      address2:this.address2,
      city:this.city,
      province:this.province,
      postalcode:this.postalcode,
      email:this.email,
      empId: this.emp_id,
      role: this.role,
      level : this.level
      // inserted_date_time : this.
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 1500});
      return false;
    }
    
    if(!this.validateService.validateRegister(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 1500});
      return false;
    }
    
    this.authService.registerUser(user).subscribe(data =>{
      if(data){
        this.flashMessage.show('Successfully added an employee', {cssClass: 'alert-success', timeout: 1500});
        this.router.navigate(['/home']);
      }
      else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 1500});
        this.router.navigate(['/addemployee']);
      }
    });

    // this.authService.registerUser(empl).subscribe(data => {
    // if(data) {
    // //   // this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
    //   this.router.navigate(['/']);      
    // } else {
    // //   // this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      
    //   this.router.navigate(['/addemployee']);
    // }
    // });

    // // this.auth.registerSociety(this.registerForm.value).subscribe(data=>{
    // // })
    // // this.authService.registerUser.reset();
  }

}
