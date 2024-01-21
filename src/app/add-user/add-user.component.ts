import { Component } from '@angular/core';
import { AuthSevices } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {


  
  repeatPass :string = 'none';
  constructor( private apiservices:AuthSevices, private router:Router, private location:Location){}

  ngOnInit():void {
    
  }

  registerForm = new FormGroup({
    firstName : new FormControl("", 
    [Validators.required, 
     Validators.minLength(3),
     Validators.pattern('[a-zA-Z.]*')

    ]),
    lastName : new FormControl("",
    [Validators.required, 
     Validators.minLength(3),
     Validators.pattern('[a-zA-Z].*')
     ]
    ),
    email : new FormControl("", 
    [
      Validators.required,
      Validators.email
    ]),
    mobile : new FormControl("", 
    [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    gender : new FormControl("", 
    [
      Validators.required
    ]),
    pwd : new FormControl("", 
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    rpwd : new FormControl(""),
  });


  serverresponse :any;

  registersubmited()
  {
   if(this.PWD.value == this.RPWD.value)
   {

    console.log("Submited")
    console.log(this.registerForm.value)
    this.repeatPass = 'none'
    this.apiservices.createuser(this.registerForm.getRawValue()).subscribe(

      (response :any) =>
      {
           // Check if the response is a string (non-JSON)
        if (typeof response === 'string') {
          // Handle the string response here
          console.log('String response:', response);

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "New User Added Successfuly",
          });
         
          this.registerForm.reset();
          this.goBack();
        } else {
          // Handle JSON response as usual
          console.log('JSON response:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "New User Added Successfuly",
          });
        }

          this.registerForm.reset();
          this.goBack();
      },

      (error)=>{
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "User Already Exist",
        });
      }
    )
 
   }
   else
   {
    this.repeatPass= 'inline';
   }
  }


  get FirstName() : FormControl {
    return this.registerForm.get("firstName") as FormControl;
  }
  get LastName() : FormControl {
    return this.registerForm.get("lastName") as FormControl;
  }

  get Email() : FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Mobile() : FormControl {
    return this.registerForm.get("mobile") as FormControl;
  }
  get Gender() : FormControl {
    return this.registerForm.get("gender") as FormControl;
  }

  get PWD() : FormControl 
  {
    return this.registerForm.get("pwd") as FormControl;
  }
  get RPWD() : FormControl 
  {
    return this.registerForm.get("rpwd") as FormControl;
  }


  
// for password showing and hiding 
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}

goBack(): void {
  this.location.back();
}


}
