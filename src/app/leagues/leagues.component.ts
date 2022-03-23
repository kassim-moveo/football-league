import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { Team } from '../team';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {
  
  leagues? : League[]
  teams? : Team[]
  selectedLeague?: League;

  onSelect(league: League): void {
  
  this.selectedLeague = league
  this.getTeamsInLeague(this.selectedLeague)
}
 
  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues(): void {
    
    this.leagueService.getLeagues()
      .subscribe(leagues => {
      this.leagues = leagues.leagues.slice(0,5)
      });
  }

  getTeamsInLeague(league:League){
    this.leagueService.getTeamsInLeague(league)
    .subscribe( teams => {
      this.teams = teams
    }

    )
  }
  constructor(private leagueService: LeagueService) { }

}
