import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { GameTypeDropdownModule } from '../game-type-dropdown/game-type-dropdown.module';
import { MaterialComponentsModule } from '../../module/material-components.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, MaterialComponentsModule, GameTypeDropdownModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
