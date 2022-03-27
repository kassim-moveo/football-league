import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  onSignOut():void{
    localStorage.removeItem("loggedIn")
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

}
