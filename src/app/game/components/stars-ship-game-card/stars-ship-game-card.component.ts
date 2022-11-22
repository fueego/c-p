import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StarshipSwapiInterface } from 'src/app/shared/model/interface/swapi-ship';

@Component({
  selector: 'app-stars-ship-game-card',
  templateUrl: './stars-ship-game-card.component.html',
  styleUrls: ['./stars-ship-game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarsShipGameCardComponent {
  @Input() shipResponse: StarshipSwapiInterface | null = null;
}
