import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OurPortalsComponent } from './our-portals/our-portals.component';
import { CmsComponent } from './cms/cms.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SeenotificationsComponent } from './seenotifications/seenotifications.component';
import { SendnotificationsComponent } from './sendnotifications/sendnotifications.component';
import { MenusComponent } from './menus/menus.component';
import { PortalviewComponent } from './portalview/portalview.component';
import { AddPageComponent } from './add-page/add-page.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { SliderImagesComponent } from './slider-images/slider-images.component';
import { authGuard } from './services/auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { InnerPagesComponent } from './inner-pages/inner-pages.component';
import { DropPagesComponent } from './drop-pages/drop-pages.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MissionPageComponent } from './mission-page/mission-page.component';




const mainPageRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default route, redirects to 'profile'
  { path: 'dashboard', component: DashboardContentComponent,
    
 },
  { path: 'profile', component: ProfileComponent },
  { path: 'ourPortals', component: OurPortalsComponent, canActivate:[authGuard] },
  { path: 'cms', component: CmsComponent },
  { path: 'report', component: ReportsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },

  { path: 'pageList/updatePage/:pageId', component: UpdatePageComponent },
  { path: 'menus/updateMenu/:menuId', component: UpdateMenuComponent, canActivate: [authGuard] },
  { path: 'pageList/addPage', component: AddPageComponent },

  { path: 'pageList', component: PagesListComponent},
  { path: 'list', component: ListComponent },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'users/adduser', component: AddUserComponent, canActivate: [authGuard] },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'sendnotifications', component: SendnotificationsComponent },
  { path: 'seenotifications', component: SeenotificationsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'menus', component: MenusComponent, canActivate: [authGuard] },
  { path: 'images', component: SliderImagesComponent },
  { path: 'portalview', component: PortalviewComponent, canActivate: [authGuard] },
 

  // Add more child routes as needed
];

const routes: Routes = [

  {
    path: 'mainpage',
    component: MainPageComponent,
    canActivate:[authGuard],
    children: mainPageRoutes, // Add child routes here
  },

  {path:'home', component:HomeComponent},
  {path:'blog', component:BlogPageComponent},
  {path:'service', component:ServicesPageComponent},
  {path:'about', component:AboutPageComponent},
  {path:'innerpages', component:InnerPagesComponent},
  {path:'droppages', component:DropPagesComponent},
  {path:'mission', component:MissionPageComponent},
  {path:'contact', component:ContactPageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home 
  { path: 'login', component: LoginComponent },
  {path: 'unauthorized', component: UnauthorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
