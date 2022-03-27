import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }
  username:string;
  onUpdateUsername(event:Event){
    
    this.username = (<HTMLInputElement>event.target).value;
  
  }

  onSubmit():void{
    // check authorization
    if (this.username ===  "demo@skills.co.il"){
      // do authorize
      localStorage.setItem('loggedIn','true')
      // route to homepage
      this.router.navigate(['../home'], { relativeTo: this.route });
    } else{
      window.alert("incorrect user info")
    }
    

  }

}
