import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { usuarioInterface } from '@interface/usuarioModel';
@Component({
  selector: 'app-card-personal',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-personal.component.html',
  styleUrl: './card-personal.component.scss'
})
export class CardPersonalComponent {
  @Input() data:usuarioInterface | undefined;
  @Output() sendId = new EventEmitter<any>();

  senndDAta(id:any){
    this.sendId.emit(id)
  }
}
