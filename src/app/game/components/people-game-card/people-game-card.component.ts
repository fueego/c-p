import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeopleSwapiInterface } from 'src/app/shared/model/interface/swapi-ppl';

@Component({
  selector: 'app-people-game-card',
  templateUrl: './people-game-card.component.html',
  styleUrls: ['./people-game-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleGameCardComponent {
  @Input() peopleResponse: PeopleSwapiInterface | null = null;
}
