import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '@services/auth-service.service';
import { GeneralServiceService } from '@services/general-service.service';
import { helperclass } from '../../../core/data/heleperclass';

@Component({
  selector: 'app-restorepassword',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './restorepassword.component.html',
  styleUrl: './restorepassword.component.scss'
})
export class RestorepasswordComponent {
  #authService = inject(AuthServiceService);
  #generalService = inject(GeneralServiceService);
  private helperclass = inject(helperclass);
  #router = inject(Router);
  #formBuild = inject(FormBuilder)
  formPasword=this.#formBuild.group({
    correo:[null,Validators.required]
  })

  async sendLogin(){
    try {

      if(!this.formPasword.valid){
        this.helperclass.showalert("Error!!","faltan campos por completar",false,"error");
        return;
      }
      this.#generalService.loandingSginal.set(true);
      await this.#authService.restorepassword(this.formPasword.value);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.showalert("Exito!!","Se han enviado las intrucciones para el incio se sesión",false,"success");
      this.#router.navigate(['']);
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }
}
