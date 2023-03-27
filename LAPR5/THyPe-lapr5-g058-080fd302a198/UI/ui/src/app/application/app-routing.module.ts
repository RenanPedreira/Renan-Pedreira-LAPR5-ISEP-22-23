import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarCamiaoComponent } from '../components/criar-camiao/criar-camiao.component';
import { CriarEmpacotamentoComponent } from '../components/criar-empacotamento/criar-empacotamento.component';
import { CriarArmazemComponent } from '../components/criar-armazem/criar-armazem.component';
import { CriarEntregaComponent } from '../components/criar-entrega/criar-entrega.component';
import { CriarPlanoComponent } from '../components/criar-plano/criar-plano.component';
import { CriarRotaComponent } from '../components/criar-rota/criar-rota.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { GestorArmazemComponent } from '../components/gestor-armazem/gestor-armazem.component';
import { GestorFrotaComponent } from '../components/gestor-frota/gestor-frota.component';
import { GestorLogisticaComponent } from '../components/gestor-logistica/gestor-logistica.component';
import { VisualizacaoRedeComponent } from '../components/visualizacao-rede/visualizacao-rede.component';
import { ListarEmpacotamentoComponent } from '../components/listar-empacotamento/listar-empacotamento.component';
import { ListarCamiaoComponent } from '../components/listar-camiao/listar-camiao.component';
import { UpdateEmpacotamentoComponent } from '../components/update-empacotamento/update-empacotamento.component';
import { ListarEntregaComponent } from '../components/listar-entrega/listar-entrega.component';
import { ListarArmazemComponent } from '../components/listar-armazem/listar-armazem.component';
import { ListarCaminhoComponent } from '../components/listar-caminho/listar-caminho.component';
import { ListarPlanoComponent } from '../components/listar-plano/listar-plano.component';
import { InibirCamiaoComponent } from '../components/inibir-camiao/inibir-camiao.component';
import { DesinibirCamiaoComponent } from '../components/desinibir-camiao/desinibir-camiao.component';

import { LoginComponent } from '../components/login/login.component';
import { AuthLoginComponent } from '../components/auth-login/auth-login.component';

import { AdministradorComponent } from '../components/administrador/administrador.component';
import { CriarContaComponent } from '../components/criar-conta/criar-conta.component';
import { ListarContaComponent } from '../components/listar-conta/listar-conta.component';
import { CriarPlanoAlgoritmoGeneticoComponent } from '../components/criar-plano-algoritmo-genetico/criar-plano-algoritmo-genetico.component';
import { InibirContaComponent } from '../components/inibir-conta/inibir-conta.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //{ path: '', component: LoginComponent, pathMatch: 'full'},
  //{ path: 'logout', component: LogoutComponent }
  //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login',component: AuthLoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'gestor-armazem', component: GestorArmazemComponent },
  { path: 'gestor-frota', component: GestorFrotaComponent },
  { path: 'gestor-logistica', component: GestorLogisticaComponent },
  { path: 'criar-camiao', component: CriarCamiaoComponent },
  { path: 'listar-camiao', component: ListarCamiaoComponent },
  { path: 'inibir-camiao', component: InibirCamiaoComponent },
  { path: 'desinibir-camiao', component: DesinibirCamiaoComponent },
  { path: 'criar-rota', component: CriarRotaComponent },
  { path: 'criar-entrega', component: CriarEntregaComponent},
  { path: 'criar-armazem', component: CriarArmazemComponent  },
  { path: 'criar-empacotamento', component: CriarEmpacotamentoComponent },
  { path: 'listar-empacotamento', component: ListarEmpacotamentoComponent },
  { path: 'update-empacotamento', component: UpdateEmpacotamentoComponent },
  { path: 'criar-plano', component: CriarPlanoComponent },
  { path: 'criar-plano-algoritmo-genetico', component: CriarPlanoAlgoritmoGeneticoComponent },
  { path: 'listar-entrega', component: ListarEntregaComponent },
  { path: 'listar-armazem', component: ListarArmazemComponent},
  { path: 'visualizacao-rede', component: VisualizacaoRedeComponent },
  { path: 'listar-caminho', component: ListarCaminhoComponent },
  { path: 'listar-plano',component:ListarPlanoComponent},
  { path: 'administrador', component:AdministradorComponent},
  { path: 'criar-conta', component:CriarContaComponent},
  { path: 'listar-conta', component:ListarContaComponent},
  { path: 'inibir-conta', component: InibirContaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }