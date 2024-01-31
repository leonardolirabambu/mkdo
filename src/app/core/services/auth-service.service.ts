import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseLogin, authModel, requestRestorePass } from '@interface/authModel';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { responseGeneral } from '@interface/generarModel';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private http = inject(HttpClient);

  login(body:authModel){
    return  firstValueFrom(this.http.post<ResponseLogin>(environment.urlserver+'auth',body));
  }
  restorepassword(body:any){
    return  firstValueFrom(this.http.post<responseGeneral>(environment.urlserver+'auth/restorepass',body));
  }
}
