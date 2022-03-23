import { Component, OnInit,Input } from '@angular/core';
import { League } from '../league';
import { Team } from '../team';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @Input() teams : Team;
  constructor() { }

  ngOnInit(): void {
    
  }

}
