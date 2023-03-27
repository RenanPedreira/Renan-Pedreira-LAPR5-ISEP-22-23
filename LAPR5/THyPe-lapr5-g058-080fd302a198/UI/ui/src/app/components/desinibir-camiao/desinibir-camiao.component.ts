import { Component } from '@angular/core';
import { Camiao } from 'src/app/domain/camiao';
import { CamiaoService } from 'src/app/services/camiao.service';

@Component({
  selector: 'app-desinibir-camiao',
  templateUrl: './desinibir-camiao.component.html',
  styleUrls: ['./desinibir-camiao.component.css']
})
export class DesinibirCamiaoComponent {

  constructor(private camiaoService: CamiaoService) { }
  camioes: Camiao[] = [];
  selectedCamiao: string = "";

  ngOnInit(): void {
    this.camiaoService.get().subscribe({
      next: camioes => {
        this.camioes = camioes;
      }
    })
  }

  desinibirCamiao() {
    for(let i = 0; i < this.camioes.length; i++) {
      if(this.camioes[i].id == this.selectedCamiao){
        let camiao: Camiao = this.camioes[i];
        camiao.ativado = true;
        this.camiaoService.inibirCamiao(camiao);
        break;
      }
    }   
  }

}