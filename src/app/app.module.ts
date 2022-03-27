import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthService } from './shared/auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    LeaguesComponent,
    LeagueDetailComponent,
    SearchBarComponent,
    LoginComponent,
    HomePageComponent,
    MapComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
   
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
