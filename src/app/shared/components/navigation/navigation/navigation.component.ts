import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GameSettings,
  GameSettingsService,
  GameType,
} from 'src/app/services/data/game-settings/game-settings.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  gameSettings$: Observable<GameSettings> =
    this.gameSettings.getGameSettingsObservable();

  constructor(private gameSettings: GameSettingsService) {}

  handleGameType(gameType: GameType): void {
    const oldValues = this.gameSettings.getRawGameSettings();

    this.gameSettings.setGameSettings({
      ...oldValues,
      gameType,
    });
  }
}
