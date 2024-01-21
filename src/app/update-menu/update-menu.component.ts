import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent {

  
  constructor (private builder: FormBuilder, private services: ApiService,
    private activatedroute:ActivatedRoute, private router:Router,
    private notifcation:ToastrService,
    private spinner:NgxSpinnerService,
    private location:Location
    ){}


 formmenu!: FormArray<any>;
 formsubmenu!: FormArray<any>;
 saveresponse: any;
 pagedata: any;
 dataid!:number;
 editdata: any;
 editproductcode: any;


 ngOnInit() : void
 {
   this.activatedroute.paramMap.subscribe((param:Params)=>{

     this.dataid=param['get']("menuId")
     console.log("data id is ", this.dataid)
   })

   if (this.dataid != null) {
     this.services.GetMenubyId(this.dataid).subscribe((item: any) => {
       this.editdata = item;
       console.log('Edit data:', this.editdata);
 
      
 
 
       this.menuform.setValue({
         menuName: this.editdata.menuName,
         menuPortal: this.editdata.menuPortal,
        
     
       });
 
       console.log('Updated pageform:', this.menuform.value);
     });
   }

   

 }



 menuform = this.builder.group({
   menuName: this.builder.control('', Validators.required),
   menuPortal: this.builder.control('', Validators.required),
  
  
 });




 updateMenu() {
   console.log(this.menuform.value);

   if(this.menuform.valid)

   {
     this.spinner.show()
     this.services.updateMenu(this.menuform.getRawValue(), this.dataid).subscribe({
       next:(res)=>{
         setTimeout(() => {
           this.spinner.hide()
           
           Swal.fire({
             icon: 'success',
             title: 'Success',
             text: 'Menu Updated Successfully',

           });

         }, 1000);
         this.goBack();
       },
       error:(res)=>{

         console.log(res)
       }
     })
   }
   else
   {
         alert("Please complete all the fields")
   }


 }


 LoadPages() {
   this.services.getAllPages().subscribe((resp) => {
     this.pagedata = resp;
     console.log(this.pagedata);
   });

 }


 config: AngularEditorConfig = {
   editable: true,
   spellcheck: true,
   height: '15rem',
   minHeight: '5rem',
   placeholder: 'Enter text here...',
   translate: 'no',
   defaultParagraphSeparator: 'p',
   defaultFontName: 'Arial',
  
 };


 goBack(): void {
   this.location.back();
 }


}
