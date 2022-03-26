import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { League } from './league';
import { Team } from './team';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private searchTerm : string ;
  private leagueSelected : boolean;
  private leaguesUrl:string = 'https://www.thesportsdb.com/api/v1/json/2/all_leagues.php';  // URL to web api
  private teamsUrl  = {
    "English Premier League" : "https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League",
    "English League Championship":"https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20League%20Championship",
    "Scottish Premier League":"https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=Scottish%20Premier%20League",
    "German Bundesliga":"https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=German%20Bundesliga",
    "Italian Serie A":"https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=Italian%20Serie%20A"
  }

  constructor(private http: HttpClient) { }

  private teamsSubject:BehaviorSubject<any> = new BehaviorSubject(null)
  $teams:Observable<any> = this.teamsSubject.asObservable()

   searchTermSubject:BehaviorSubject<string> = new BehaviorSubject('')
  $currentTerm:Observable<any> = this.teamsSubject.asObservable()

  getTeamsInLeague(league:League): Observable<Team[]> {
    this.leagueSelected = true;
    const newTeams = this.http.get<Team[]>(this.teamsUrl[league.strLeague])
    this.teamsSubject.next(newTeams)
    return this.http.get<Team[]>(this.teamsUrl[league.strLeague])
  }

  getLeagues(): Observable<{leagues:League[]}> {
    
    return this.http.get<{leagues:League[]}>(this.leaguesUrl)
    
    // .pipe(
    //   tap((data)=>{console.log("results from sports API",data);
    //   }),
    //   // catchError(this.handleError<League[]>('getLeagues', []))
    // );
  }
 
  isLeagueSelected() : boolean {
    return this.leagueSelected;
  } 

  updateSearchTerm(term:string) : void{
    this.searchTermSubject.next(term)
  }
  // getSearchTerm():Observable<string> {
  //   console.log( "in service2" + this.searchTerm);
    
  //   return of(this.searchTerm)
  // }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
