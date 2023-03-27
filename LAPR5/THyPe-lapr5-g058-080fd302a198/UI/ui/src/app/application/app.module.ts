import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from '../components/messages/messages.component';

import { AppComponent } from './app.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CriarRotaComponent } from '../components/criar-rota/criar-rota.component';
import { CriarCamiaoComponent } from '../components/criar-camiao/criar-camiao.component';
import { CriarEntregaComponent } from '../components/criar-entrega/criar-entrega.component';
import { CriarArmazemComponent } from '../components/criar-armazem/criar-armazem.component';
import { CriarEmpacotamentoComponent } from '../components/criar-empacotamento/criar-empacotamento.component';

import { AppRoutingModule } from './app-routing.module';
import { GestorArmazemComponent } from '../components/gestor-armazem/gestor-armazem.component';
import { GestorFrotaComponent } from '../components/gestor-frota/gestor-frota.component';
import { GestorLogisticaComponent } from '../components/gestor-logistica/gestor-logistica.component';
import { CriarPlanoComponent } from '../components/criar-plano/criar-plano.component';
import { VisualizacaoRedeComponent } from '../components/visualizacao-rede/visualizacao-rede.component';
import { ListarEmpacotamentoComponent } from '../components/listar-empacotamento/listar-empacotamento.component';
import { ListarCamiaoComponent } from '../components/listar-camiao/listar-camiao.component';
import { ListarCaminhoComponent } from '../components/listar-caminho/listar-caminho.component';
import { AtualizarCamiaoComponent } from '../components/atualizar-camiao/atualizar-camiao.component';
import { UpdateEmpacotamentoComponent } from '../components/update-empacotamento/update-empacotamento.component';
import { ListarEntregaComponent } from '../components/listar-entrega/listar-entrega.component';
import { ListarArmazemComponent } from '../components/listar-armazem/listar-armazem.component';
import { ListarPlanoComponent } from '../components/listar-plano/listar-plano.component';

import { MatTableModule} from '@angular/material/table';
import { AuthLoginComponent } from '../components/auth-login/auth-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InibirCamiaoComponent } from '../components/inibir-camiao/inibir-camiao.component';
import { DesinibirCamiaoComponent } from '../components/desinibir-camiao/desinibir-camiao.component';
import { ReactiveFormsModule } from '@angular/forms';
import {SocialLoginModule,SocialAuthServiceConfig,FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

import { AdministradorComponent } from '../components/administrador/administrador.component';
import { CriarContaComponent } from '../components/criar-conta/criar-conta.component';
import { ListarContaComponent } from '../components/listar-conta/listar-conta.component';
import { CriarPlanoAlgoritmoGeneticoComponent } from '../components/criar-plano-algoritmo-genetico/criar-plano-algoritmo-genetico.component';
import { InibirContaComponent } from '../components/inibir-conta/inibir-conta.component';


@NgModule({

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocialLoginModule, 
    CommonModule,
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    CriarRotaComponent,
    CriarCamiaoComponent,
    CriarEntregaComponent,
    CriarArmazemComponent,
    CriarEmpacotamentoComponent,
    GestorArmazemComponent,
    GestorFrotaComponent,
    GestorLogisticaComponent,
    MessagesComponent,
    CriarPlanoComponent,
    VisualizacaoRedeComponent,
    ListarEmpacotamentoComponent,
    ListarCamiaoComponent,
    ListarCaminhoComponent,
    AtualizarCamiaoComponent,
    UpdateEmpacotamentoComponent,
    ListarEntregaComponent,
    ListarArmazemComponent,
    ListarPlanoComponent,
    InibirCamiaoComponent,
    DesinibirCamiaoComponent,
    AdministradorComponent,
    CriarContaComponent,
    ListarContaComponent,
    CriarPlanoAlgoritmoGeneticoComponent,
    AuthLoginComponent, 
    InibirContaComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '840406667234629'
            )
          }
        ],onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }