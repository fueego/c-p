import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, Observable, of, Subject, take } from 'rxjs';
import {
  GameSettings,
  GameSettingsService,
  GameType,
} from 'src/app/services/data/game-settings/game-settings.service';
import { SwapiService } from 'src/app/services/http/swapi.service';
import { PeopleSwapiInterface } from 'src/app/shared/model/interface/swapi-ppl';
import { StarshipSwapiInterface } from 'src/app/shared/model/interface/swapi-ship';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameWrapperComponent {
  gameSettings$: Observable<GameSettings>;
  peopleResp$ = new Subject<PeopleSwapiInterface[] | null>();
  starshipsResp$ = new Subject<StarshipSwapiInterface[] | null>();

  constructor(
    private gameSettings: GameSettingsService,
    private swapiSrvc: SwapiService
  ) {
    this.gameSettings$ = this.gameSettings.getGameSettingsObservable();
  }

  handlePlayeBtn(gameType: GameType): void {
    const player1Id = this.generateRandom1to100();
    const player2Id = this.generateRandom1to100();

    gameType === 'people'
      ? this.generateResultsForPpl(player1Id, player2Id)
      : this.generateResultsForShips(player1Id, player2Id);
  }

  handleResetBtn(): void {
    this.gameSettings.setGameSettings({
      gameType: 'people',
      player1Score: 0,
      player2Score: 0,
    });
    this.peopleResp$.next(null);
  }

  private generateResultsForPpl(player1Id: number, player2Id: number): void {
    this.swapiSrvc
      .getPeopleResults(player1Id, player2Id)
      .pipe(
        take(1),
        filter((resp: PeopleSwapiInterface[]) => resp?.length > 1)
      )
      .subscribe((resp: PeopleSwapiInterface[]) => {
        this.peopleResp$.next(resp);
        this.updateResults<PeopleSwapiInterface>(resp, 'mass');
      });
  }

  private generateResultsForShips(player1Id: number, player2Id: number): void {
    this.swapiSrvc
      .getStarshipResults(player1Id, player2Id)
      .pipe(
        take(1),
        filter((resp: StarshipSwapiInterface[]) => resp?.length > 1)
      )
      .subscribe((resp: StarshipSwapiInterface[]) => {
        this.starshipsResp$.next(resp);
        this.updateResults<StarshipSwapiInterface>(resp, 'crew');
      });
  }

  // ----------- helpers (should be public) - business logic which is framework agnostic
  // ----------- can be moved to separate files

  generateRandom1to100(): number {
    return Math.floor(Math.random() * 100 + 1);
  }

  updateResults<V>(result: V[], key: keyof V): void {
    const [player1, player2] = this.getStatistics<V>(result, key);
    const currentGameStatus = this.gameSettings.getRawGameSettings();

    if (player1 > player2) {
      const player1Score = currentGameStatus.player1Score + 1;

      this.gameSettings.setGameSettings({
        ...currentGameStatus,
        player1Score,
      });
    }

    if (player2 > player1) {
      const player2Score = currentGameStatus.player2Score + 1;

      this.gameSettings.setGameSettings({
        ...currentGameStatus,
        player2Score,
      });
    }

    if (player1 === player2) {
      const player1Score = currentGameStatus.player1Score + 1;
      const player2Score = currentGameStatus.player2Score + 1;

      this.gameSettings.setGameSettings({
        ...currentGameStatus,
        player1Score,
        player2Score,
      });
    }
  }

  getStatistics<T>(result: T[], key: keyof T): Number[] {
    const [player1Res, player2Res] = result;
    const checkPlayer1 = player1Res[key];
    const checkPlayer2 = player2Res[key];

    const player1 = isNaN(Number(checkPlayer1)) ? 0 : Number(checkPlayer1);
    const player2 = isNaN(Number(checkPlayer2)) ? 0 : Number(checkPlayer2);

    return [player1, player2];
  }
}
