import { Component } from '@angular/core';
import { AuthSevices } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userInfo:any;
  constructor( private authservices:AuthSevices){}

  ngOnInit(): void {
    this.userInfo = this.authservices.loadCurrentUser();
    console.log(this.userInfo);
  }

}
