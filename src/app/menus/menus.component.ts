import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent {

  saveresponse: any;
  menudata: any;
  menus!: any;
  selectedMenu!: string;
  formsubmenu!: FormArray<any>;

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
      this.LoadMenus();
      this.getAllMenus();
    }, 1000);
  }

  menuform = this.builder.group({
    menuName: this.builder.control('', Validators.required),
    menuPortal: this.builder.control('', Validators.required),
    submenus: this.builder.array([]),
  });

  getAllMenus() {
    this.services.getALlMenus().subscribe((data: any) => {
      this.menus = data;
      console.log(this.menus);
    });
  }

  LoadMenus() {
    this.services.getALlMenus().subscribe((resp) => {
      this.menudata = resp;
      console.log(this.menudata);
    });
  }



  //  ------------------------------
  SaveMenu() {
    console.log(this.menuform.value);

    if (this.menuform.valid) {
      this.spinner.show();

      this.services.SaveMenu(this.menuform.getRawValue()).subscribe(
        (item: any) => {
          this.saveresponse = item;
          console.log(this.menuform)
          console.log(this.saveresponse);

          setTimeout(() => {
            this.spinner.hide();
            // this.toaster.success(
            //   'New Page Added Successfully',
            //   'Parc Portal Hub'
            // );
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'New Menu Added Successfully',

            });
            this.menuform.reset();
            this.LoadMenus();
          }, 1000);
        },

        (error) => {
          console.error('Error:', error);
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



  deletemenu(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.spinner.show();
      this.services.deleteMenu(id).subscribe({
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
              text: 'Menu Deleted Successfully',
            });
           
            this.LoadMenus();
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


  // -------------------------------------

  // funcitons for submenus
  AddSubMenus() {
    this.formsubmenu = this.menuform.get('submenus') as FormArray;
    this.formsubmenu.push(this.Generaterowsubmenu());
  }



  Generaterowsubmenu() {
    return this.builder.group({
      submenuName: this.builder.control(''),
      submenuPortal: this.builder.control(''), // Add submenuPortal here
    });
  }
  
  get subMenus() {
    return this.menuform.get('submenus') as FormArray;
  }

  RemoveSubMenus(index: any) {
    if (confirm('do you want to remove this submenu?')) {
      this.formsubmenu = this.menuform.get('submenus') as FormArray;
      this.formsubmenu.removeAt(index);
    }
  }

}
