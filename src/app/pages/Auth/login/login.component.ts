import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '@services/auth-service.service';
import { GeneralServiceService } from '@services/general-service.service';
import { CookieService } from 'ngx-cookie-service';
import { helperclass } from '../../../core/data/heleperclass';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  #cockieservices= inject(CookieService);
  private helperclass = inject(helperclass);
  #authService = inject(AuthServiceService);
  #generalService = inject(GeneralServiceService);
  #formBuid = inject(FormBuilder);
  #router = inject(Router);
  formLogin:FormGroup = this.#formBuid.group({
    usuario:[null,Validators.required],
    password:[null,Validators.required]
  })

 async sendLogin(){
    if(!this.formLogin.valid){
      this.helperclass.showalert("Error!!","faltan campos por completar",false,"error");
    }
    this.#generalService.loandingSginal.set(true);
    try {
      localStorage.removeItem('dataUserMkdo');
     localStorage.removeItem('tokenmkdo');
     const {token,dataUsuario,firstTime} = await this.#authService.login(this.formLogin.value);
     console.log(token);
     localStorage.setItem('dataUserMkdo',JSON.stringify(dataUsuario));
     localStorage.setItem('tokenmkdo',token!);

     this.#generalService.loandingSginal.set(false);
     console.log(firstTime);
     if(firstTime ==='1'){
      this.#router.navigate(['auth/actualizarpassword']);
     }else if(dataUsuario?.perfil==='mercadeo'){
       this.#router.navigate(['lista/cordinador']);
     }
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }
}
