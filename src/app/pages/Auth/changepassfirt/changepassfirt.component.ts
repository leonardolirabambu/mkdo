import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from '@services/general-service.service';
import { PersonalService } from '@services/personal.service';
import { helperclass } from '../../../core/data/heleperclass';
import { confirmPasswordValidator } from '../../../core/data/function';
import { requestChangePassword } from '@interface/usuarioModel';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-changepassfirt',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './changepassfirt.component.html',
  styleUrl: './changepassfirt.component.scss'
})
export class ChangepassfirtComponent {
  #personalService = inject(PersonalService);
  #generalService = inject(GeneralServiceService);
  #cockieservices= inject(CookieService);
  #router = inject(Router);
  private helperclass = inject(helperclass);
  #formBuild = inject(FormBuilder);
     formContrasa = this.#formBuild.group({
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required]]
  }, { validators: [confirmPasswordValidator] });

  async sendPasword(){

    try {
      await this.helperclass.validatetoken();
      if(!this.formContrasa.valid){
        this.helperclass.showalert('Error!!!','Las contraseñas no coinciden',false);
        return;
      }
      const body:requestChangePassword = {
        password: this.formContrasa.value.password!
      }
      this.#generalService.loandingSginal.set(true);
      const {data} = await this.#personalService.chagepasswprd(body);
      this.#generalService.loandingSginal.set(false);
      const dataUsuario = JSON.parse(this.#cockieservices.get('dataUserMkdo'));
      if(dataUsuario?.perfil==='mercadeo'){
        this.#router.navigate(['lista'], { queryParams: { type:'cordinador' }, queryParamsHandling: 'merge' });
      }else if(dataUsuario?.perfil==='cordinador'){
        this.#router.navigate(['lista'], { queryParams: { type:'doctor' }, queryParamsHandling: 'merge' });
      }else{
        console.log("es doctor");
      }

    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }


}
