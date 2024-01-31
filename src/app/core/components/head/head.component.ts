import { Component, effect, inject,Input } from '@angular/core';
import { GeneralServiceService } from '@services/general-service.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { helperclass } from '../../data/heleperclass';

@Component({
  selector: 'app-head',
  standalone: true,
  imports: [MatButtonModule,CommonModule,MatIconModule],
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent {
@Input() transparent =false;
private helperclass = inject(helperclass);
#roter= inject(Router);
  showMenuUser= false;
#generalService = inject(GeneralServiceService);
public dataUser = JSON.parse(localStorage.getItem('dataUserMkdo')!);

openMenu(){

  this.#generalService.menuSginal.set(true);
}
async closeSesion(){
  const responseAlert = await this.helperclass.showalert('Alerta!','¿Estas seguro de cerrar sesión?',true,"question");
  if(responseAlert){
    localStorage.removeItem('dataUserMkdo');
    localStorage.removeItem('tokenmkdo');
    this.#roter.navigate(['']);
  }

}
}
