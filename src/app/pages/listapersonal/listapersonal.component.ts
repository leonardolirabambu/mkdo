import { Component, OnInit, inject } from '@angular/core';
import { HeadComponent } from '../../core/components/head/head.component';
import { MatCardModule } from '@angular/material/card';
import { CardPersonalComponent } from '../../core/components/card-personal/card-personal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { requestUsuarios, usuarioInterface } from '@interface/usuarioModel';
import { PersonalService } from '@services/personal.service';
import { helperclass } from '../../core/data/heleperclass';
import { GeneralServiceService } from '@services/general-service.service';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { pagesList } from '../../core/data/data';
@Component({
  selector: 'app-listapersonal',
  standalone: true,
  imports: [HeadComponent, MatCardModule, CardPersonalComponent, MatIconModule, ReactiveFormsModule, FormsModule, MatPaginatorModule],
  templateUrl: './listapersonal.component.html',
  styleUrl: './listapersonal.component.scss'
})
export class ListapersonalComponent implements OnInit {
  pagesList = pagesList;
  private helperclass = inject(helperclass);
  #generalService = inject(GeneralServiceService);
  #activatedRoute = inject(ActivatedRoute);
  #personalService = inject(PersonalService);
  #router = inject(Router);
  typeList = '';
  totalRegister: number | undefined = 0;
  filters: requestUsuarios = {
    page: 0,
    limit: 10,
    palabra: '',
    type: this.typeList
  };
  listaPersona: usuarioInterface[] | undefined = [];
  titlePage = '';
  ngOnInit() {
    this.#activatedRoute.params.subscribe(
      params => {
        this.filters.type = params['type']
        switch (this.filters.type) {
          case 'cordinador':
            this.titlePage = 'Coordinadores Regionales'
            break;
          case 'doctor':
            this.titlePage = 'Doctores'
            break;
          case 'mercadeo':
            this.titlePage = 'Coordinadores Mkdo'
            break;
        }
        this.getlist();
      }
    );

  }

  async getlist() {
    try {
      this.#generalService.loandingSginal.set(true);
      const { data, code } = await this.#personalService.getpersonal(this.filters);
      console.log(data);
      this.listaPersona = data?.usuarios;
      this.totalRegister = data?.total;
      this.#generalService.loandingSginal.set(false);
    } catch (error) {
      console.log(error);
      this.#generalService.loandingSginal.set(false);
      this.helperclass.handleServerError(error);
    }
  }
  handlePageEvent({ pageIndex, pageSize }: { pageIndex: any, pageSize: any }) {
    this.filters.page = pageIndex;
    this.filters.limit = pageSize
    this.getlist();
  }

  getData(id: any) {
    this.#router.navigate(['datos/persona/' + id])
  }

}
