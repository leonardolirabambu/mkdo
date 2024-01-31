import { Component, inject,OnInit } from '@angular/core';
import { HeadComponent } from '../../core/components/head/head.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalService } from '@services/personal.service';
import { helperclass } from '../../core/data/heleperclass';
import { GeneralServiceService } from '@services/general-service.service';
import {  usuarioInterface } from '@interface/usuarioModel';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-personal',
  standalone: true,
  imports: [HeadComponent,MatIconModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './data-personal.component.html',
  styleUrl: './data-personal.component.scss'
})
export class DataPersonalComponent implements OnInit{
  #generalService = inject(GeneralServiceService);
  private helperclass = inject(helperclass);
  #router = inject(Router);
  #activeRouter = inject(ActivatedRoute)
  #personalService = inject(PersonalService);
  #formBuid = inject(FormBuilder);
  data:usuarioInterface| undefined;
  fordata:FormGroup  =this.#formBuid.group({
    id:[null],
      nombre:[null,Validators.required],
  apMaterno:[null,Validators.required],
  apPaterno:[null,Validators.required],
  telefono:[null,Validators.required],
  correo:[null,Validators.required],
  submit:[null,Validators.required],
  status:[null,Validators.required],
  fechaAlta:[null],
  codigo:[null,Validators.required],
  foto:[null],
  perfil:[null],
  superior:[null,Validators.required],
  paseabordarvuelta:[null],
  paseabordarida:[null],
  confirmacion:[null],
  cartainvitacion:[null],
  agenda:[null],
  })
  constructor() {
    this.data = {  };
  }
  ngOnInit(){
   this.getdata();
  }

 async getdata(){
    try {
      this.#generalService.loandingSginal.set(true);
      const {data}  = await this.#personalService.getData(this.#activeRouter.snapshot.params['id']);
      this.data = data;
      this.fordata.patchValue(data!);
      this.#generalService.loandingSginal.set(false);
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }

  async sendData(){
    try {
      if(!this.fordata.valid){
        this.helperclass.showalert("Error!!","faltan campos por completar",false,"error");
        return;
      }
      console.log(this.fordata.value);
      await this.#personalService.update(this.fordata.value);
      this.helperclass.showalert("Exito!!",'Los datos se han actualizado',false,"success");
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }

  async resetPassword(){
    try {
      this.#generalService.loandingSginal.set(true);
      const body = {
        usuario:this.#activeRouter.snapshot.params['id']
      }

      await this.#personalService.resetpassword(body);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.showalert("Exito!!",'La contraseña se ha modificado con exito, su contraseña es: 1234',false,"success");
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }

  sendemail(type:string){
    try {
      this.#generalService.loandingSginal.set(true);
      const body = {
        type:type,
        code:this.fordata.value.code,
        id:this.#activeRouter.snapshot.params['id']
      }

      this.#generalService.loandingSginal.set(false);
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }
}
