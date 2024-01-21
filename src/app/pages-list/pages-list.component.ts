import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css'],
})
export class PagesListComponent {

  saveresponse: any;
  pagedata: any;
  menus!: any;
  selectedMenu!: string;

  constructor(
    private builder: FormBuilder,
    private services: ApiService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.LoadPages();
      this.getAllMenus();
    }, 1000);
    
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

}
