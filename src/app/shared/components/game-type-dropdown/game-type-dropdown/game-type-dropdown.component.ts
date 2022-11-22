import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  GameSettings,
  GameType,
} from 'src/app/services/data/game-settings/game-settings.service';

@Component({
  selector: 'app-game-type-dropdown',
  templateUrl: './game-type-dropdown.component.html',
  styleUrls: ['./game-type-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTypeDropdownComponent implements OnChanges {
  @Input() gameSettings: GameSettings | null = null;
  @Output() changeGameType = new EventEmitter<GameType>();

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['gameSettings'] &&
      !changes['gameSettings'].firstChange &&
      this.gameSettings?.player1Score === 0 &&
      this.gameSettings?.player2Score === 0
    ) {
      this.gameType.patchValue(this.gameSettings.gameType);
    }
  }

  gameType = new FormControl<GameType>(this.gameSettings?.gameType ?? 'people');
  gameOptions: GameType[] = ['people', 'starships'];

  handleSelection(): void {
    const { value: gameType } = this.gameType;
    this.changeGameType.emit(gameType as GameType);
  }
}
