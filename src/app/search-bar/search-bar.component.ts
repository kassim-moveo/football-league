import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../league.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  term:string
  searchTerm:string
  leagueSelected = true
  searchHistory : string[]  = [];
  HISTORY_MAX_SIZE:number = 5;
  constructor( private leagueService: LeagueService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("search-history",JSON.stringify(this.searchHistory) )
  }

  onSignOut():void{
    localStorage.removeItem("loggedIn")
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  onSubmit():void{

  
    if(this.searchHistory.length>this.HISTORY_MAX_SIZE-1){
      this.searchHistory.splice(0,1)
    }
    this.searchHistory.push(this.term)
    localStorage.setItem("search-history",JSON.stringify(this.searchHistory) )
    this.leagueService.updateSearchTerm(this.term)
  }

  public codeValue: string;

  public codeList = [
    { id: 1, name: 'Angular 2+' },
    { id: 2, name: 'Angular 4' },
    { id: 3, name: 'Angular 5' },
    { id: 4, name: 'Angular 6' },
    { id: 5, name: 'Angular 7' },
    { id: 5, name: 'Angular 8' },
    { id: 5, name: 'Angular 9' },
    { id: 5, name: 'Angular 11' },
  ];

  // getLeagues(): void {
    
  //   this.leagueService.getLeagues()
  //     .subscribe(leagues => {
  //     this.leagues = leagues.leagues.slice(0,5)
  //     });
  // }

}
