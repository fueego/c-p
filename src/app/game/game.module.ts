import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameWrapperComponent } from './components/game-wrapper/game-wrapper.component';
import { PeopleGameCardComponent } from './components/people-game-card/people-game-card.component';
import { MaterialComponentsModule } from '../shared/module/material-components.module';
import { UnknownToNumberModule } from '../shared/pipes/unknown-to-number/unknown-to-number.module';
import { ErrorModule } from '../shared/components/error/error.module';
import { StarsShipGameCardComponent } from './components/stars-ship-game-card/stars-ship-game-card.component';

@NgModule({
  declarations: [GameWrapperComponent, PeopleGameCardComponent, StarsShipGameCardComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    UnknownToNumberModule,
    ErrorModule,
  ],
  exports: [GameWrapperComponent],
})
export class GameModule {}
