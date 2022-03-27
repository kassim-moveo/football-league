import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {path:'login' , component: LoginComponent},
  {path:'' , redirectTo:'home',pathMatch:'full'},
  {path:'home' , component: HomePageComponent, canActivate:[AuthGuard]},
  {path:'map' , component: MapComponent, canActivate:[AuthGuard]},
  {path:'search/:searchTerm' , component: TeamsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
