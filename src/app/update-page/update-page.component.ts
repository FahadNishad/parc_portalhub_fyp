import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor/public-api';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent {


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

      this.dataid=param['get']("pageId")
      console.log("data id is ", this.dataid)
    })

    if (this.dataid != null) {
      this.services.GetPagebyId(this.dataid).subscribe((item: any) => {
        this.editdata = item;
        console.log('Edit data:', this.editdata);
  
       
  
  
        this.pageform.setValue({
          pageName: this.editdata.pageName,
          pageCode: this.editdata.pageName,
          pageDescription: this.editdata.pageDescription,
      
        });
  
        console.log('Updated pageform:', this.pageform.value);
      });
    }

    

  }



  pageform = this.builder.group({
    pageName: this.builder.control('', Validators.required),
    pageCode: this.builder.control('', Validators.required),
    pageDescription: this.builder.control('', Validators.required),
   
  });


 
 
  updatePage() {
    console.log(this.pageform.value);

    if(this.pageform.valid)

    {
      this.spinner.show()
      this.services.updatePage(this.pageform.getRawValue(), this.dataid).subscribe({
        next:(res)=>{
          setTimeout(() => {
            this.spinner.hide()
            
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Page Updated Successfully',

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
