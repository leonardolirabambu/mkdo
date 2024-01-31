export interface responseUsuarios{
  data?: userData;
  code?: number;
}
export interface userData {
  usuarios?: usuarioInterface[];
  total?:    number;
}

export interface responseDataUsuario{
  data?: usuarioInterface;
  code?: number;
}

export interface requestSendMaild{
  type:string;
  code:string
  id:string;
}

export interface requestChangePassword{
  password?:string;
}

export interface requestReseteoPassword{
  usuario?:string;
}



export interface requestUsuarios{
    page?:    number;
    limit?:   number;
    type?:    string;
    palabra?: string;
}

export interface usuarioInterface {
  id?:        string;
  nombre?:    string;
  apMaterno?: string;
  apPaterno?: string;
  telefono?:  string;
  correo?:    string;
  submit?:    string;
  status?:    string;
  fechaAlta?: string;
  codigo?:    string;
  foto?:      string;
  perfil?:    string;
  superior?:  string;
  paseabordarvuelta?:string;
  paseabordarida?:string;
  confirmacion?:string;
  cartainvitacion?:string;
  agenda?:string;
  paseabordarvueltaURL?:string;
  paseabordaridaURL?:string;
  confirmacionURL?:string;
  cartainvitacionURL?:string;
  agendaURL?:string;
}
