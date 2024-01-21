import { Component } from '@angular/core';
import { AuthSevices } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  userInfo:any;
  constructor( private authservices:AuthSevices, private router:Router, private spinner:NgxSpinnerService){}

  ngOnInit(): void {
    this.userInfo = this.authservices.loadCurrentUser();
    console.log(this.userInfo);
  }

  logout()
  {
    this.spinner.show()
    setTimeout(() => {

      this.authservices.removeToken(); 
     this.router.navigateByUrl('/login'); 

     this.spinner.hide();
      
    }, 100);
     
  }



}
