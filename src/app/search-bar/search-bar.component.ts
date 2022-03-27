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


  onSubmit():void{

  
    if(this.searchHistory.length>this.HISTORY_MAX_SIZE-1){
      this.searchHistory.splice(0,1)
    }
    this.searchHistory.push(this.term)
    localStorage.setItem("search-history",JSON.stringify(this.searchHistory) )
    this.leagueService.updateSearchTerm(this.term)
  }


}
