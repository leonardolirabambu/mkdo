import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { requestChangePassword, requestReseteoPassword, requestSendMaild, requestUsuarios, responseDataUsuario, responseUsuarios, usuarioInterface } from '@interface/usuarioModel';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { responseGeneral } from '@interface/generarModel';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  #http = inject(HttpClient);

  getpersonal(body:requestUsuarios){
    return  firstValueFrom(this.#http.post<responseUsuarios>(environment.urlserver+'usuarios/listsub',body));
  }
  chagepasswprd(body:requestChangePassword){
    return  firstValueFrom(this.#http.post<responseGeneral>(environment.urlserver+'updatepassword/restablecerpassword',body));
  }

  getData(body:any){
    return  firstValueFrom(this.#http.get<responseDataUsuario>(environment.urlserver+'usuarios/datauser/'+body));
  }

  update(body:any){
    return  firstValueFrom(this.#http.post<responseDataUsuario>(environment.urlserver+'usuarios/update',body));
  }


  sendMaild(body:requestSendMaild){
    return  firstValueFrom(this.#http.post<responseGeneral>(environment.urlserver+'usuarios/update',body));
  }

  resetpassword(body:requestReseteoPassword){
    return  firstValueFrom(this.#http.post<responseGeneral>(environment.urlserver+'updatepassword/reseteopassword',body));
  }

}
