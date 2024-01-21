import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthSevices {

  userurl = 'https://localhost:7016/api/User/'
  currentUser : BehaviorSubject<any> = new BehaviorSubject(null);

  jwtHelperService = new JwtHelperService();

  constructor(private http:HttpClient) { }


  createuser(inputdata:any)
  {
    return this.http.post(this.userurl, inputdata);
  }

  getAllUsers()
  {
    return this.http.get<any>(this.userurl);
  }


  loginuser(inputdata: any): Observable<string> {
    return this.http.post(this.userurl + 'LoginUser', inputdata, { responseType: 'text' });
  }

  setToken(token:string)
  {
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }

  loadCurrentUser():string
  {
      const token = localStorage.getItem("access_token");
      const userInfo = token != null? this.jwtHelperService.decodeToken(token) : null;
      const data = userInfo ? {
        id: userInfo.id,
        firstname: userInfo.firstname,
        lastname: userInfo.lasttname,
        email: userInfo.email,
        mobile: userInfo.mobile,
        gender: userInfo.gender,

      }: null;


      console.log(userInfo);
       return userInfo;

  }

  isLogedin(): boolean 
  {
    return localStorage.getItem("access_token") ? true : false; 
  }

  removeToken(){
    localStorage.removeItem("access_token");
  }

  isSuperAdmin(): boolean {
    const token = localStorage.getItem('access_token');
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    console.log('Decoded Token:', userInfo);
    return userInfo && userInfo.email === 'fahadnishad124@gmail.com';
  }
  
  canAccessRoute(routePath: string): boolean {
    const superAdminRoutes = ['users', 'menus', 'portalview', 'ourPortals'];
    const isSuperAdmin = this.isSuperAdmin();
    
    console.log('Checking route access for:', routePath);
    console.log('Is Super Admin:', isSuperAdmin);
  
    const canAccess = isSuperAdmin || (routePath === 'mainpage') || !superAdminRoutes.includes(routePath);
    
    console.log('Can Access:', canAccess);
    
    return canAccess;
  }
  
  
  

}
