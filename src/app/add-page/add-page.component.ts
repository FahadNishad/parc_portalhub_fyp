import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent {
  
  saveresponse: any;
  pagedata: any;
  menus!: any;
  selectedMenu!: string;

  constructor(
    private builder: FormBuilder,
    private services: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private location:Location
  ) {}

  ngOnInit(): void {
    
      this.LoadPages();
      this.getAllMenus();

  }

  pageform = this.builder.group({
    pageName: this.builder.control('', Validators.required),
    pageDescription: this.builder.control('', Validators.required),
    pageCode: this.builder.control('', Validators.required),
    menuId: this.builder.control('', Validators.required),
  });

  getAllMenus() {
    this.services.getALlMenus().subscribe((data: any) => {
      this.menus = data;

      console.log(this.menus);

      // Set the default value to the first menu's id if menus array is not empty
    });
  }

  LoadPages() {
    this.services.getAllPages().subscribe((resp) => {
      this.pagedata = resp;
      console.log(this.pagedata);
    });
  }

  //  ------------------------------
  SavePage() {
    console.log(this.pageform.value);

    if (this.pageform.valid) {
      // this.spinner.show();

      this.services.SavePage(this.pageform.getRawValue()).subscribe(
        (item: any) => {
          this.saveresponse = item;
          console.log(this.pageform)
          console.log(this.saveresponse);

          setTimeout(() => {
            // this.spinner.hide();
            // this.toaster.success(
            //   'New Page Added Successfully',
            //   'Parc Portal Hub'
            // );
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'New Page Added Successfully',

            });
            this.pageform.reset();
            this.LoadPages();
          }, 1000);

          this.goBack();
        },

        (error) => {
          console.error('Error:', error);
          // Display only the error message in an alert box
          //  alert('Menu is not found or already has been used');

           // Display the extracted error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Menu not available or already has been used",
        });

          this.spinner.hide();
        }
      );
    } else {
      alert('please enter valid data');
    }
  }

  deletepage(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.spinner.show();
      this.services.deletePage(id).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.spinner.hide();
            // this.toaster.error(
            //   'Page has been deleted successfully',
            //   'Parc Portal Hub'
            // );
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Page Deleted Successfully',
            });
           
            this.LoadPages();
          }, 1000);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
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
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
  };

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  goBack(): void {
    this.location.back();
  }


}
