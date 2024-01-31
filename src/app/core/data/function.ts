import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export const alertinfo = (title='',text='',icon:SweetAlertIcon='error',confirmButtonText='',cancelButtonText='')=>{
  Swal.fire(
    title,
    text,
    icon
  )
}


export const showalert =(text:string,html:string,showCancelButton =true):Promise<any>=>{

  return Swal.fire({
     title: text,
     html: html,
     showCancelButton:showCancelButton,
     confirmButtonText:'Aceptar',
     cancelButtonText:'Cancelar'
   });
 }

 export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  return control.value.password === control.value.newpassword? null : { PasswordNoMatch: true };
};
