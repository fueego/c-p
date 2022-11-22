import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type GameType = 'people' | 'starships';

export interface GameSettings {
  gameType: GameType;
  player1Score: number;
  player2Score: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  private gameSettings$ = new BehaviorSubject<GameSettings>({
    gameType: 'people',
    player1Score: 0,
    player2Score: 0,
  });

  getRawGameSettings(): GameSettings {
    return this.gameSettings$.getValue();
  }

  getGameSettingsObservable(): Observable<GameSettings> {
    return this.gameSettings$.asObservable();
  }

  setGameSettings(gameSettings: GameSettings): void {
    this.gameSettings$.next(gameSettings);
  }
}
