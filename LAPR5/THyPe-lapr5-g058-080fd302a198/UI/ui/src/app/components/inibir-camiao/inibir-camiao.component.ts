import { Component } from '@angular/core';
import { Camiao } from 'src/app/domain/camiao';
import { CamiaoService } from 'src/app/services/camiao.service';

@Component({
  selector: 'app-inibir-camiao',
  templateUrl: './inibir-camiao.component.html',
  styleUrls: ['./inibir-camiao.component.css']
})
export class InibirCamiaoComponent {

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

  inibirCamiao() {
    for(let i = 0; i < this.camioes.length; i++) {
      if(this.camioes[i].id == this.selectedCamiao){
        let camiao: Camiao = this.camioes[i];
        camiao.ativado = false;
        this.camiaoService.inibirCamiao(camiao);
        break;
      }
    }   
  }

}
