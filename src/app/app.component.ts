import { Component, effect,  ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { GeneralServiceService } from './core/services/general-service.service';
import {MatDrawer, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import { MenuComponent } from './core/components/menu/menu.component';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NgxLoadingModule,MatSidenavModule,MenuComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  title = 'mkdo';
  loading = false;
  showFiller =false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes ;
  constructor(
    private GeneralService:GeneralServiceService
  ){


     effect(()=>{
      this.loading = this.GeneralService.loandingSginal();
      if(this.GeneralService.menuSginal()){
        console.log(this.GeneralService.menuSginal());
        this.drawer.open();

      }
     });
  }

  closeMenu(event:boolean){
    if(!event){
      this.GeneralService.menuCloseSginal.set(false);
    }else{
      this.GeneralService.menuSginal.set(false);
    }

  }
}
