import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { OpenHouseComponent } from './open-house/open-house.component';
import { MyServiceComponent } from './my-service/my-service.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogComponent } from './blog/blog.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: PropertyDetailComponent },  
  { path: 'about', component: AboutComponent },  
  { path: 'editOwner', component: EditOwnerComponent },  
  { path: 'home', component: HomeComponent },  
  { path: 'property/:id', component: PropertyComponent },  
  { path: 'blog', component: BlogListComponent },  
  { path: 'blog/:id', component: BlogListComponent },  
  { path: 'openHouse', component: OpenHouseComponent },  
  { path: 'service', component: MyServiceComponent },  
  { path: 'editBlog/:id', component: BlogEditComponent },  
  { path: 'post/:id', component: BlogComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
