import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [
    {name:'Hapoel tlv',logo:'logo1'},
    {name:'Hapoel haifa',logo:'logo2'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
