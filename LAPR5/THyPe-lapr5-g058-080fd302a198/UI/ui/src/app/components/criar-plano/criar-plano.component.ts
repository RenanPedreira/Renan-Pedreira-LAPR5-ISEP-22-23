import { Component, OnInit } from '@angular/core';
import { PlanoRequest } from '../../domain/planorequest';
import { Camiao } from 'src/app/domain/camiao';
import { CamiaoService } from 'src/app/services/camiao.service';
import { PlanoService } from 'src/app/services/plano.service';

@Component({
  selector: 'app-criar-plano',
  templateUrl: './criar-plano.component.html',
  styleUrls: ['./criar-plano.component.css']
})
export class CriarPlanoComponent implements OnInit {

  constructor(private planoService: PlanoService, private camiaoService: CamiaoService) { }
  camioes: Camiao[] = [];
  selectedId: string = "";

  ngOnInit(): void {
    this.camiaoService.get().subscribe({
      next: camioes => {
        this.camioes = camioes;
      }
    })
  }

  add(rdata: string,
      rheuristica: string): void { 
  let date:number;
  let heuristica:number;

  rdata = rdata.split('-').join('');
  date=Number(rdata);
  heuristica=Number(rheuristica);

  this.planoService.createPlano({date, heuristica} as PlanoRequest);
}

}
