import { Component } from '@angular/core';
import { AuthSevices } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {



  constructor(private authservices:AuthSevices, private router:Router, private spinner: NgxSpinnerService){}

  logout()
  {
      this.authservices.removeToken(); 
      this.router.navigateByUrl('/login'); 
   
  }

}
