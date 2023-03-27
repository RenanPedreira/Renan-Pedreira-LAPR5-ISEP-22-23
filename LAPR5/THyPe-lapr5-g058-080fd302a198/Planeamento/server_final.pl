:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_unix_daemon)).
:- use_module(library(socket)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Servidor

% Gerir servidor
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).

%Factos
:-dynamic camiao/6.
:-dynamic rota/6.
:-dynamic empacotamento/5.
:-dynamic armazem/8.
:-dynamic entrega/6.

persist():- tell('inc1.pl'),
            listing(camiao/6),
            listing(rota/6),
            listing(armazem/8),
            listing(entrega/6),
            listing(empacotamento/5),
            told.

%Criar_Camiao
:- http_handler('/criarCamiao', criaCamiao, []).
criaCamiao(Request):- http_parameters(Request, [matricula(M, []),
                                                tara(Tara, []),
                                                cargaKg(CargaKg, []),
                                                cargaKWh(CargaKWh, []),
                                                autonomia(Autonomia, []),
                                                carregamento(Carregamento, [])]),
                      atom_number(Tara, T),
                      atom_number(CargaKg, CK),
                      atom_number(CargaKWh, CW),
                      atom_number(Autonomia, A),
                      atom_number(Carregamento, C),
                      retractall(camiao(M,_,_,_,_,_)),
                      assertz(camiao(M, T, CK, CW, A, C)),
                      persist(),
                      prolog_to_json(201, JSONObject),
                      reply_json(JSONObject, [json_object(dict)]).
                      
                      
%Criar_Rota
:- http_handler('/criarRota', criaRota, []).
criaRota(Request):- http_parameters(Request, [distancia(Dist, []),
                                                armazem1(Armazem1, []),
                                                armazem2(Armazem2, []),
                                                tempoPercorrer(Tempo, []),
                                                carregamento(Carregamento, []),
                                                carregamentoExtra(Extra, [])]),
                      atom_number(Dist, D),
                      atom_number(Armazem1, A1),
                      atom_number(Armazem2, A2),
                      atom_number(Tempo, T),
                      atom_number(Carregamento, C),
                      atom_number(Extra, E),
                      retractall(rota(_,A1,A2,_,_,_)),
                      assertz(rota(D, A1, A2, T, C, E)),
                      persist(),
                      prolog_to_json(201, JSONObject),
                      reply_json(JSONObject, [json_object(dict)]).




%Criar_Empacotamento
:- http_handler('/criarEmpacotamento', criaEmpacotamento, []).
criaEmpacotamento(Request):- http_parameters(Request, [entrega(Entrega, []),
                                                       matricula(M, []),
                                                       posx(Posx, []),
                                                       posy(Posy, []),
                                                       posz(Posz, [])]),
                      atom_string(Entrega, E),
                      atom_number(Posx, X),
                      atom_number(Posy, Y),
                      atom_number(Posz, Z),
                      retractall(empacotamento(E,_,_,_,_)),
                      assertz(empacotamento(E, M, X, Y, Z)),
                      persist(),
                      prolog_to_json(201, JSONObject),
                      reply_json(JSONObject, [json_object(dict)]).



%Criar_Entrega
:- json_object arma(id:string, armazem:string, data:string, massa:float, tempoc:integer, tempor:integer). 

:- http_handler('/criarEntrega', criaEntrega, []).
criaEntrega(Request):- http_read_json(Request, JSON, [json_object(dict)]),
                       armazem(JSON.armazem,_,_,_,_,_,_,Cidade),
                       number_string(DataNumber, JSON.data),
                       retractall(entrega(Cidade,_,_,_,_)),
                       assertz(entrega(JSON.id, Cidade, DataNumber, JSON.massa, JSON.tempoc, JSON.tempor)),
                       persist(),
                       prolog_to_json(JSON.id, JSONObject),
                       reply_json(JSONObject, [json_object(dict)]).

%Criar_Armazem
:- json_object arma(id:string, designacao:string, endereco:string, lojaId:string, municipio:string, latitude:float, longitude:float, cidadeNo:integer).              

:- http_handler('/criarArmazem', criaArmazem, []).
criaArmazem(Request):- http_read_json(Request, JSON, [json_object(dict)]),
                       retractall(armazem(JSON.id,_,_,_,_,_,_,_)),
					   assertz(armazem(JSON.id, JSON.designacao, JSON.endereco, JSON.lojaId, JSON.municipio, JSON.latitude, JSON.longitude, JSON.cidadeNo)),	
                       persist(),
                       prolog_to_json(JSON.id, JSONObject),
                       reply_json(JSONObject, [json_object(dict)]).
                        
                        
                        
%--------------------------------------------------------------------------------------------
armazem_base(5).


%Encontra_todos_os_caminhos
caminhos(Armazens, Caminhos):- findall(Caminho,(permutation(Armazens,Caminho)),Caminhos).

%--------------------------------------------------------------------------------------------
%Calculo_tempo_rota


tara(T):-camiao('BL-00-DD',T,_,_,_,_).
tcarregamento(T):-camiao('BL-00-DD',_,_,_,_,T).
autonomiamax(A):-camiao('BL-00-DD',_,_,_,A,_).
cargainicial(C):-camiao('BL-00-DD',_,_,C,_,_).
cargamax(C):-camiao('BL-00-DD',_,C,_,_,_).

%Soma_pesos_da_Entrega
soma_pesos([],[],0).
soma_pesos([Cidade|LC],[PesoAc|LP],PesoAc):-
    soma_pesos(LC,LP,PesoAc1),entrega(_,Cidade,_,Peso,_,_),PesoAc is Peso+PesoAc1.

%Acrescenta_a_tara_do_camiao
acrescenta_tara(Tara,[],[Tara]).
acrescenta_tara(Tara,[Peso|LP],[PesoTara|LPT]):-
    acrescenta_tara(Tara,LP,LPT),
    PesoTara is Peso+Tara.

%Calcula_o_custo_da_viagem_sem_paragens
calcula_custo_viagem(LC,Custo):-
    soma_pesos(LC,LP,_),
    tara(Tara),
    cargamax(Carga),
    acrescenta_tara(Tara,LP,LPT),
     append([5|LC],[5],LCcompleto),
    custo(LCcompleto,LPT,Custo,Tara,Carga).

custo([_],[],0,_,_).
custo([C1,C2|LCcompleto],[PT|LPT],Custo,Tara,Carga):-
    custo([C2|LCcompleto],LPT,Custo1,Tara,Carga),
    (rota(_,C1,C2,T,_,_);rota(_,C2,C1,T,_,_)),
    Custo is Custo1+T*(PT/(Tara+Carga)). %, Autonomia is Autonomia1 + R * (PT/(Tara+Carga)).

%calcula_custo_das_paragens
calcula_custo_paragem(LE,Tempo):-
                                  cargainicial(Autonomia),
                                  soma_pesos(LE,LP,_),
                                  tara(Tara),
                                  acrescenta_tara(Tara,LP,LPT),
                                  append([5|LE],[5],LEcompleto),
                                  custo_paragem(LEcompleto,Autonomia,Tempo,LPT).

custo_paragem([_],_,0,[]).
custo_paragem([Cidade1,Cidade2|LE],Autonomia,Tempo,[MassaCamiao|LPT]):-
   ((Cidade1 == 5  ,
   calculaEnergiaParaProximaCidade(Cidade1,Cidade2,MassaCamiao,Energia),
   Autonomia1 is Autonomia - Energia ,
   custo_paragem([Cidade2|LE],
   Autonomia1,Tempo,LPT) ));
   (rota(_,Cidade1,Cidade2,_,_,TempoExtra),
   calculaEnergiaParaProximaCidade(Cidade1,Cidade2,MassaCamiao,Energia),
   entrega(_,Cidade1,_,_,_,TempoRetirar),
   TempoExtra1 is TempoExtra,
   TempoExtra2 is TempoRetirar,cargainicial(CM)),
   ((TempoExtra\=0,!,True = 0 );(True=1)), Autonomia1 is Autonomia - Energia  ,
   ( Cidade2\=5  ,((Autonomia1< (CM*0.2), !,
   tcarregamento20_80(Autonomia,Tcarregar),
   ((True==0,EnergiaDoTrosso  is (CM * 0.2));
   EnergiaDoTrosso  is (CM * 0.8) -Autonomia) ,
   ((Tcarregar>TempoExtra2, Tfinal1 is TempoExtra1 + Tcarregar );
   Tfinal1 is TempoExtra2+TempoExtra1));((Tfinal1 is TempoExtra2),
   ((True==0,EnergiaDoTrosso  is (CM * 0.2));EnergiaDoTrosso is Autonomia1)));
   ((Autonomia1<(CM*0.2), !, tcarregamentoFinal(Autonomia,Energia,Tcarregar),
   ((True==0,EnergiaDoTrosso is (CM * 0.2));EnergiaDoTrosso  is (CM * 0.8) -Autonomia),
   ((Tcarregar>TempoExtra2, Tfinal1 is TempoExtra1 + Tcarregar );
   Tfinal1 is TempoExtra2+TempoExtra1));((Tfinal1 is TempoExtra2),
   ((True==0,EnergiaDoTrosso  is (CM * 0.2));EnergiaDoTrosso is Autonomia1)))),
   custo_paragem([Cidade2|LE],EnergiaDoTrosso,Tempo1,LPT),
   Tempo is Tempo1 + Tfinal1.

tcarregamento20_80(Autonomia,Tcarga):- buscarCarregamentoMaxTempo(Carga,Tempo),
                                       Tcarga is ((Carga*0.8) - Autonomia) * (Tempo/48).

tcarregamentoFinal(Autonomia1,Autonomia2,Tcarga):-
	buscarCarregamentoMaxTempo(Carga,Tempo),
    ((Autonomia2>Autonomia1,
    Tcarga is ((Carga*0.2) - (Autonomia2 - Autonomia1)) * (Tempo/48));
    (Tcarga is ((Carga*0.2) - (Autonomia1 - Autonomia2)*(Tempo/48)))).

buscarCarregamentoMaxTempo(Carga,Tempo):-cargainicial(Carga) , tcarregamento(Tempo).

calculaEnergiaParaProximaCidade(C1,C2,M,E):- tara(Tara), cargamax(Carga),
                                             (rota(_,C1,C2,_,A1,_);
                                             rota(_,C2,C1,_,A1,_)),
                                             E is (A1*(M/(Tara+Carga))).

calculoTotal(LE,TF):- calcula_custo_paragem(LE,Tempo), calcula_custo_viagem(LE,Tempo1), TF is Tempo + Tempo1 .

%--------------------------------------------------------------------------------------------
%Caminho_otimo

solucao_otima(Caminhos, CaminhoOtimo):- retractall(otimo(_,_)),
                                        asserta(otimo([], 9000)),
                                        caminho_otimo(Caminhos),
                                        otimo(CaminhoOtimo,_).

caminho_otimo([]):-!.
caminho_otimo([CaminhoAtual|Caminhos]):- calculoTotal(CaminhoAtual, CustoAtual),
                                         otimo(CaminhoOtimo, CustoMenor),
                                         (CustoAtual<CustoMenor, 
                                         retractall(otimo(CaminhoOtimo,_)),
                                         asserta(otimo(CaminhoAtual, CustoAtual)),
                                         caminho_otimo(Caminhos));
                                         caminho_otimo(Caminhos). 



%--------------------------------------------------------------------------------------------
%Heuristicas

%Distancia:

%Adiciona_origem_e_destino_ao_plano_calculado
heuDist([Armazem|Armazens], CaminhoFinal):- buildPathDist(Armazem, Armazens, Caminho),
                                            append([5|Caminho], [5], CaminhoFinal).
                                            
%Calcula_o_plano_baseado_na_distancia_entre_armazens
buildPathDist(_,[],[]):-!.
buildPathDist(Armazem, Armazens, [ArmazemProximo|Caminho]):-  retractall(armazemProximo(_,_)),
                                                              asserta(armazemProximo(5,9000)),
                                                              findClosestDist(Armazem, Armazens),
                                                              armazemProximo(ArmazemProximo,_),
                                                              delete(Armazens, ArmazemProximo, ArmazensRestantes),
                                                              buildPathDist(ArmazemProximo, ArmazensRestantes, Caminho).
                                                              
%Encontra_o_armazem_mais_proximo
findClosestDist(_,[]):-!.
findClosestDist(Armazem, [Current|Armazens]):- rota(Dist,Armazem,Current,_,_,_), 
                                               armazemProximo(ArmazemProximo,DistAtual),
                                               (Dist<DistAtual,
                                                 retractall(armazemProximo(ArmazemProximo,_)),
                                                 asserta(armazemProximo(Current, Dist)),
                   							     findClosestDist(Armazem, Armazens));    
                                               findClosestDist(Armazem, Armazens).


%Peso
%Adiciona_origem_e_destino_ao_plano_calculado
heuristicaMassa([Armazem|Armazens], Data, CaminhoFinal):- calculaMassa(Armazem, Armazens, Data, Caminho),
                                                          append([5|Caminho], [5], CaminhoFinal).

%Calcula_o_plano_baseado_no_peso_da_entrega
calculaMassa(_A,[],_D,[]):-!.
calculaMassa(Armazem, Armazens, Data, [ArmazemProximo|Caminho]):- retractall(armazemProximo(_,_)),
                                                                 asserta(armazemProximo(5,0)),
                                                                 calculaMaiorMassa(Armazem, Data, Armazens),
                                                                 armazemProximo(ArmazemProximo,_),
                                                                 delete(Armazens, ArmazemProximo, ArmazensRestantes),
                                                                 calculaMassa(ArmazemProximo, ArmazensRestantes, Data, Caminho).

%Encontra_o_proximo_armazem
calculaMaiorMassa(_A,_D, []):-!.
calculaMaiorMassa(Armazem, Data, [Current|Armazens]):- entrega(_, Current, Data, Massa, _, _),
                                                       armazemProximo(ArmazemProximo, MassaAtual),
                                                       (Massa>=MassaAtual,
                                                       retractall(armazemProximo(ArmazemProximo,_)),
                                                       asserta(armazemProximo(Current, Massa)),
                                                       calculaMaiorMassa(Armazem, Data, Armazens));
                                                      calculaMaiorMassa(Armazem, Data, Armazens).

 

%Distancia_e_Peso
heuDistPeso([Armazem|Armazens],Data, CaminhoFinal):- buildPathDistPeso(Armazem, Armazens,Data, Caminho),
                                                     append([5|Caminho], [5], CaminhoFinal).

%Calcula_o_plano_baseado_no_peso_e_distancia
buildPathDistPeso(_A,[],_D,[]):-!.
buildPathDistPeso(Armazem, Armazens, Data, [ArmazemProximo|Caminho]):-  
                                                          retractall(armazemProximo(_,_)),
                                                          asserta(armazemProximo(5,0)),
                                                          findClosestDistPeso(Armazem,Data,Armazens),
                                                          armazemProximo(ArmazemProximo,_),
                                                          delete(Armazens, ArmazemProximo, ArmazensRestantes),
                                                          buildPathDistPeso(ArmazemProximo, ArmazensRestantes,Data, Caminho).

%Encontra_o_proximo_armazem
findClosestDistPeso(_A,_D,[]):-!.
findClosestDistPeso(Armazem, Data, [Current|Armazens]):- rota(Dist,Armazem,Current,_,_,_),
                                                         entrega(_, Current, Data, Massa, _, _),
                                                         Custo is Massa/Dist,
                                                         armazemProximo(ArmazemProximo,CustoAtual),
                                                         (Custo>=CustoAtual,
                                                           retractall(armazemProximo(ArmazemProximo,_)),
                                                           asserta(armazemProximo(Current, Custo)),
                                                           findClosestDistPeso(Armazem,Data, Armazens));
                                                         findClosestDistPeso(Armazem,Data, Armazens).



%--------------------------------------------------------------------------------------------
%Calcular_plano_a_partir_de_um_camiao_e_uma_data

:- http_handler('/calculaRota', calculaRota, []).
calculaRota(Request):- http_parameters(Request, [camiao(Camiao, []), data(Data, []), heuristica(Heuristica, [])]),
                       atom_number(Data, DataNumber),
                       atom_number(Heuristica, HeuristicaNumber),
                       listaArmazem(Camiao, DataNumber, ListaArmazens),
                       plano(ListaArmazens, HeuristicaNumber, DataNumber, MelhorCaminho),
                       delete(MelhorCaminho, 5, CaminhoArmazens),
                       entregasArmazens(CaminhoArmazens, Camiao, DataNumber, Entregas),
                       Result = [CaminhoArmazens, Entregas],
                       prolog_to_json(Result, JSONObject),
                       reply_json(JSONObject, [json_object(dict)]).


%lista_dos_armazens_a_serem_visitados_por_um_camiao_em_uma_data
listaArmazem(Camiao, Data, List):- findall(Armazem,(entrega(Entrega, Armazem, Data,_,_,_), 
                                           empacotamento(Entrega,Camiao,_,_,_)), 
                                           ListTotal),sort(ListTotal, List).

%Obtem_as_entregas_do_camiao_para_uma_data
entregasArmazens([], _Camiao, _Data, []):-!.
entregasArmazens([H|T], Camiao, Data, [Entregas|Result]):- entregasArmazem(H, Camiao, Data, Entregas),entregasArmazens(T, Camiao, Data, Result).
entregasArmazem(Armazem, Camiao, Data, Entregas):- findall(Entrega,(entrega(Entrega, Armazem, Data,_,_,_), empacotamento(Entrega,Camiao,_,_,_)), Entregas).


%Calcula_plano_a_partir_de_uma_heuristica_ou_calculo_compelto
plano(Armazens, Heuristica, Data, Result):-
    (Heuristica is 2,
     %Heuristica_Distancia
     heuDist([5|Armazens], Result);
    (Heuristica is 3,
     %Heuristica_Massa
     heuristicaMassa([5|Armazens], Data, Result));
    (Heuristica is 4,
     %Heuristica_Distancia_Peso
     heuDistPeso([5|Armazens], Data, Result);
     %Calculo_completo
     caminhos(Armazens, CaminhosPossiveis),
     solucao_otima(CaminhosPossiveis, Result))).
     
:- http_handler('/planoCusto', planoCusto, []).
planoCusto(_Request):- calculoTotal([101,102,103], Custo),
                       prolog_to_json(Custo, JSONObject),
                       reply_json(JSONObject, [json_object(dict)]).
     
%----------------------------------------------------------------------------


:- http_handler('/calculaRotaCost', calculaRotaCost, []).
calculaRotaCost(Request):- http_parameters(Request, [camiao(Camiao, []), data(Data, []), heuristica(Heuristica, [])]),
                       atom_number(Data, DataNumber),
                       atom_number(Heuristica, HeuristicaNumber),
                       listaArmazem(Camiao, DataNumber, ListaArmazens),
                       get_time(T1),
                       plano(ListaArmazens, HeuristicaNumber, DataNumber, MelhorCaminho),
                       get_time(T2),
                       Tsol is T2-T1,
                       delete(MelhorCaminho, 5, CaminhoArmazens),
                       calculoTotal(CaminhoArmazens, Custo),
                       Result = [CaminhoArmazens, Custo, Tsol],
                       prolog_to_json(Result, JSONObject),
                       reply_json(JSONObject, [json_object(dict)]).