import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../../module/material-components.module';
import { GameTypeDropdownComponent } from './game-type-dropdown/game-type-dropdown.component';

@NgModule({
  declarations: [GameTypeDropdownComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule],
  exports: [GameTypeDropdownComponent],
})
export class GameTypeDropdownModule {}
