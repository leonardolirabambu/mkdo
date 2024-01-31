import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  #http = inject(HttpClient);
  public loandingSginal = signal<boolean>(false);
  public menuSginal = signal<boolean>(false);
  public menuCloseSginal = signal<boolean>(true);
  constructor() { }
}
