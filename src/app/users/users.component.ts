import { Component } from '@angular/core';
import { AuthSevices } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(private userapi:AuthSevices){}


  ngOnInit()
  {
    this.getAllUsers(); 
  }


  userdata:any;
  getAllUsers()
  {
    this.userapi.getAllUsers().subscribe((resp)=>{
      this.userdata= resp;
      console.log(this.userdata)
    })
  }

}
