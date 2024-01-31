import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2'
import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class helperclass{
  #cockieservices= inject(CookieService);
  #router = inject(Router);
  constructor(
    private router: Router,
    private location:Location
  ){

  }
  back() {
    this.location.back();
  }

  goRouter(url: string, params = {}): void {
    this.router.navigate([`/${url}`], { queryParams: { ...params } });
  }

  showalert(text:string,html:string,showCancelButton =true,type:SweetAlertIcon='info'):Promise<any>{

   return Swal.fire({
      icon:type,
      title: text,
      html: html,
      showCancelButton:showCancelButton,
      confirmButtonText:'Aceptar',
      cancelButtonText:'Cancelar'
    });
  }

  dateConverter = (date: string, formate = 'YYYY-MM-DD HH:mm:ss'): string | Date => {
    return dayjs(date).locale('en').format(formate);
  };

  isAdmin(){
    const dataAdmin = JSON.parse(localStorage.getItem('dataMotor')!);
    if(dataAdmin.admin === 1){
      return true;
    }else{
      this.showalert('Error!!','No tiene permisos para esta acción',false);
      return false;
    }
  }
  isAdminAccion(){
    const dataAdmin = JSON.parse(localStorage.getItem('dataMotor')!);
    if(dataAdmin.admin === 1){
      return true;
    }else{

      return false;
    }
  }

  detectarvalorbuscatr(array:any,item:any){
    const index = array.findIndex((cus:any)=>cus===item);
    if(index>=0){
      return true;
    }else{
      return false;
    }
  }
  handleServerError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 500) {
        // Código para manejar el error 500 (u otro código de error)
        console.error('Error 500 - Error interno del servidor');
        // Muestra una alerta al usuario
        this.showalert('Error!!!','Ocurrió un error interno del servidor. Por favor, inténtalo de nuevo más tarde.',false,'error');
        if(error.error.code===1504 || error.error.code===1505){
          this.goRouter('/login')
      }
      } else {
        // Otros códigos de error
        console.error('Error:', error);
        // Muestra una alerta al usuario
        this.showalert('Error!!!',error.error.message,false,'error');
        if(error.error.code===1504 || error.error.code===1505){
          localStorage.removeItem('tokenmkdo');
            this.goRouter('/login')
        }
      }
    } else {
      localStorage.removeItem('tokenmkdo');
      // Otros tipos de errores
      console.error('Error inesperado:', error);
      // Muestra una alerta al usuario
      this.showalert('Error!!!','Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',false,'error');
      this.goRouter('/login')
    }
  }
  validatetoken(){
    if(!localStorage.getItem('tokenmkdo')){
      this.showalert("Error!!","La se sesión se cerro automanticamente favor de inicar sesión");
      localStorage.removeItem('tokenmkdo');
      this.#router.navigate(['']);
    }
  }
}
