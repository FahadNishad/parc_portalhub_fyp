import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}



  pagesurl = 'https://localhost:7016/api/Page/'
  menusurl= 'https://localhost:7016/api/Menu/'
  producturl='https://localhost:7016/api/product/add'
  getproducturl='https://localhost:7016/api/product/GetProducts'

  private _refreshrequired = new Subject<void>();

  SavePage(inputdata: any) {
    return this.http.post(this.pagesurl, inputdata);
  }



  getAllPages() {
    return this.http.get<any>(this.pagesurl);
  }


  deletePage(id:number){

    return this.http.delete<any>(this.pagesurl+id)
  }


  GetPagebyId(code: any) {
    return this.http.get(this.pagesurl+ code);
  }


  updatePage(data:any, id:number)
  {
          return  this.http.put(this.pagesurl +id , data);
  }




//  api for menus 


SaveMenu(inputdata: any) {
  return this.http.post(this.menusurl, inputdata);
}


  getALlMenus()
  {
    return this.http.get<any>(this.menusurl);
  }
  

  deleteMenu(id:number){

    return this.http.delete<any>(this.menusurl+id)
  }


  GetMenubyId(code: any) {
    return this.http.get(this.menusurl+ code);
  }


  updateMenu(data:any, id:number)
  {
          return  this.http.put(this.menusurl +id , data);
  }


  // for images 

  uploadSlider(inputdata: FormData) {
    return this.http.post(this.producturl, inputdata).pipe(
      catchError((error: any) => {
        console.error('Error uploading slider:', error);
        throw error; // Rethrow the error for the component to handle
      })
    );
  }

  getProducts()
  {
    return this.http.get<any>(this.getproducturl);
  }


  

}
