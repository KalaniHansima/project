import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { RecentComponent } from './components/recent/recent.component';
import { DocsComponent } from './components/docs/docs.component';
import { UploadDocComponent } from './components/upload-doc/upload-doc.component';
import { ApprovedDocComponent } from './components/approved-doc/approved-doc.component';
import { RejectedDocComponent } from './components/rejected-doc/rejected-doc.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';



const appRoutes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'addemployee', component: AddUserComponent},
  {path:'profile',component:ProfileComponent},
  {path:'home',component:HomeComponent},
  {path:'home/viewdoc',component:DocsComponent}
  
  // {
  //   path: 'dash',
  //   component: {
  //     RecentComponent,
  //     UploadDocComponent}
  //   // children: [
  //   //   // {path: '', redirectTo: 'tracks'},
  //   //   {path: '*', component: UploadDocComponent},
  //   //   {path: 'dash', component: DocsComponent},
  //   // ]
  // }
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeftbarComponent,
    RecentComponent,
    DocsComponent,
    UploadDocComponent,
    ApprovedDocComponent,
    RejectedDocComponent,
    NavBarComponent,
    AddUserComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
