import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slider-images',
  templateUrl: './slider-images.component.html',
  styleUrls: ['./slider-images.component.css']
})

export class SliderImagesComponent {

  selectedFile: File | null = null;
  sliderForm: FormGroup;
  saveresponse:any;
  products: any[] = [];

  constructor(private builder: FormBuilder, private sliderService:ApiService, private spinner:NgxSpinnerService) {

    this.sliderForm = this.builder.group({
      ProductName: this.builder.control('', Validators.required),
      ImageFile: this.builder.control('', [Validators.required, fileTypeValidator]),
    });
    
  }


  
  ngOnInit() {
    this.sliderService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.sliderForm.get('ImageFile')?.updateValueAndValidity();
    }
  }


  saveProduct() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('ProductName', this.sliderForm.get('ProductName')?.value);
      formData.append('ImageFile', this.selectedFile);
  
      this.sliderService.uploadSlider(formData).subscribe(
        (item: any) => {
          setTimeout(() => {
            this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'New product added successfuly',

            });
            this.sliderForm.reset();
          }, 1000);
          this.saveresponse = item;
          console.log(this.saveresponse);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    } 
    
    else {
      console.error('No file selected.');
      // Handle this case according to your requirements
    }
  }






}



// Custom validator function to check if the value is a File object
function fileTypeValidator(control: AbstractControl): { [key: string]: any } | null {
  const value = control.value;
  if (value instanceof File) {
    return null; 
  }
  return { 'invalidFileType': true }; 




    }


