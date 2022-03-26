import { Component, OnInit,Input } from '@angular/core';
import { League } from '../league';
import { Team } from '../team';
import { LeagueService } from '../league.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @Input() teams : Team;
  searchTerm : string;
  constructor(private leagueService: LeagueService) { }

  ngOnInit(): void {
    this.getSearchTerm()
  }

  getSearchTerm(): void {
    this.leagueService.searchTermSubject.subscribe(term => {
      this.searchTerm = term
      if(this.searchTerm && this.teams){

      this.teams.teams = this.teams.teams.filter(teamEl => teamEl.strTeam.toLowerCase().includes(this.searchTerm.toLowerCase()))

      }
      
    })
     
  }

}
