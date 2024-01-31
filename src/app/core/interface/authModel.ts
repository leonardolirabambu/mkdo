import { usuarioInterface } from "./usuarioModel";

export interface authModel{
  correo:string;
  password:string;
}


export interface ResponseLogin {
  token?:       string;
  dataUsuario?: usuarioInterface;
  firstTime?:   string;
  code?:        number;
  message?: string;
}

export interface requestRestorePass{
  correo?:string;
}


