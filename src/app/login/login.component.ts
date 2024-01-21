import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthSevices } from '../services/auth.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private spinner: NgxSpinnerService,
    private apiservices:AuthSevices,
    private router:Router

  ){}

  ngOnInit():void{
    // this.spinner.show()
    // setTimeout(() => {
    //   this.spinner.hide()

    // }, 1000);
  }


  
  loginForm = new FormGroup ({
    email : new FormControl("", 
    [
      Validators.required,
      Validators.email
    ]),
    pwd : new FormControl("", 
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),


  })



  isUserValid : boolean =false;
  
  loginsubmited()
  {
    console.log(this.loginForm)
   this.apiservices.loginuser(this.loginForm.getRawValue()).subscribe(
    (response : any)=>
    {
       console.log(response)
       Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Login Successful",
      });
      this.isUserValid = true;
      console.log(this.isUserValid)
      this.apiservices.setToken(response)
      this.router.navigateByUrl('mainpage')

    },
    (error)=>
    {
        console.error("Error", error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Opps Please check password and email again",
        });
        this.isUserValid= false;

        console.log(this.isUserValid)
      
    }
   )
    
  }

 


   

  get Email() : FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  get PWD() : FormControl 
  {
    return this.loginForm.get("pwd") as FormControl;
  }


  // for password showing and hiding 
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}




}
