import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, combineLatestWith, EMPTY, Observable } from 'rxjs';
import { PeopleSwapiInterface } from 'src/app/shared/model/interface/swapi-ppl';
import { StarshipSwapiInterface } from 'src/app/shared/model/interface/swapi-ship';
import { ErrorHandlerService } from '../error/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private readonly url = 'https://swapi.dev/api/';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getPeople(id: number): Observable<PeopleSwapiInterface | never> {
    return this.http.get<PeopleSwapiInterface>(`${this.url}people/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(
          `Error occured here could be some error handler fn: ${
            err?.message || err?.statusText
          }`
        );

        this.errorHandler.openSnackBar();
        return EMPTY;
      })
    );
  }

  getPeopleResults(
    player1Id: number,
    player2Id: number
  ): Observable<PeopleSwapiInterface[] | never> {
    return this.getPeople(player1Id).pipe(
      combineLatestWith(this.getPeople(player2Id))
    );
  }

  getStarShip(id: number): Observable<StarshipSwapiInterface | never> {
    return this.http
      .get<StarshipSwapiInterface>(`${this.url}starships/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(
            `Error occured here could be some error handler fn: ${
              err?.message || err?.statusText
            }`
          );

          this.errorHandler.openSnackBar();
          return EMPTY;
        })
      );
  }

  getStarshipResults(
    player1Id: number,
    player2Id: number
  ): Observable<StarshipSwapiInterface[] | never> {
    return this.getStarShip(player1Id).pipe(
      combineLatestWith(this.getStarShip(player2Id))
    );
  }
}
