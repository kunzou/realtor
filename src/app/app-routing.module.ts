import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesComponent } from './properties/properties.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';

const routes: Routes = [
  { path: 'properties', component: PropertiesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: PropertyDetailComponent },  
  { path: 'about', component: AboutComponent },  
  { path: 'home', component: HomeComponent },  
  { path: 'property/:id', component: PropertyComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
