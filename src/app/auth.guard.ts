import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // authentication and authorization code here
      // should be calling a user service - pass user/password and make sure user is correct

      if(this.authService.loggedIn()){
        return true;
      }else{
        window.alert("no permission to log in")
        // navigate to login page
        this.router.navigate(['login'], { relativeTo: this.route });
        return false;
      }
  
  }

  constructor(private authService:AuthService,private route: ActivatedRoute,
    private router: Router){}
  
}


