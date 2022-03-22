import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { Team } from '../team';
@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {
  teams: Team[] = [
    {name:'Hapoel tlv',logo:'logo1'},
    {name:'Hapoel haifa',logo:'logo2'},
    {name:'bne sakhnin',logo:'logo3'}
  ];
  leagues: League[] = [
    {name:"league 1",teams:this.teams.slice(1,2)},
    {name:"league 2",teams:this.teams}
  ];

  selectedLeague?: League;

  onSelect(league: League): void {
  this.selectedLeague = league;
}
 
  ngOnInit(): void {
 //   this.getLeagues();
  }

  getLeagues(): void {
    // this.leagueService.getLeagues()
    //   .subscribe(leagues => this.leagues = leagues);
  }
 // constructor(private leagueService: LeagueService) { }

}
