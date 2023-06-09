%% Sample server.pl script to run an HTTP server
%%

%Factos
:-dynamic camiao/6.
:-dynamic rota/6.
:-dynamic empacotamento/5.
:-dynamic armazem/8.
:-dynamic entrega/6.

:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
%:- use_module(library(http/http_unix_daemon)).
:- use_module(library(socket)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

%--------------------------------------------------------------------------------------------
:- http_handler(/, reply_root, []).
reply_root(_Request) :-
        format('Content-type: text/plain~n~n'),
        format('HTTP Server on SWI-Prolog is ready~n').



persist():-    tell('inc1.pl'),
               listing(camiao/6),
               listing(rota/6),
               listing(armazem/8),
               listing(entrega/6),
               listing(empacotamento/5),
               told.

%--------------------------------------------------------------------------------------------

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


tara(T):-camiao('BL-00-DD',T,_,_,_,_,_).
tcarregamento(T):-camiao('BL-00-DD',_,_,_,_,T,_).
autonomiamax(A):-camiao('BL-00-DD',_,_,_,A,_,_).
cargainicial(C):-camiao('BL-00-DD',_,_,C,_,_,_).
cargamax(C):-camiao('BL-00-DD',_,C,_,_,_,_).

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
                       convertArmazens(CaminhoArmazens, Armazens),
                       Result = [Armazens, Entregas],
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
planoCusto(_Request):- calculoTotal([109,106,103], Custo),
                       prolog_to_json(Custo, JSONObject),
                       reply_json(JSONObject, [json_object(dict)]).


convertArmazens([], []):-!.
convertArmazens([ArmInt|CaminhoArmazens], [ArmString|Armazens]):- number_string(ArmInt, ArmString),
                                                                  convertArmazens(CaminhoArmazens, Armazens).

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


%----------------------------------------------------------------------------


:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic armazens/1.
:-dynamic caminho/1.
:-dynamic genTempoI/1.


%ALGORITIMO_GENETICO
ag(Camiao,Data,Limite,Tempo,Result):-
        listaArmazem(Camiao,Data,ListaArmazens),
        inicializa(ListaArmazens, 100, 10, 0.5, 0.25),
        gera(ListaArmazens, Data, [Result*_Val|_Pop], Limite, Tempo),
        !.


inicializa(Armazens, Geracoes, Populacao, PCruzamento, PMutacao):-
               retractall(geracoes(_)), asserta(geracoes(Geracoes)),
               retractall(populacao(_)), asserta(populacao(Populacao)),
               retractall(prob_cruzamento(_)), asserta(prob_cruzamento(PCruzamento)),
               retractall(prob_mutacao(_)), asserta(prob_mutacao(PMutacao)),
               length(Armazens, ArmNumber),
               retractall(armazens(_)), asserta(armazens(ArmNumber)).

gera(Armazens, Data, PopOrdF, Lim,Tempo):-
        statistics(runtime,[T|_]),
        retractall(genTempoI(_)), asserta(genTempoI(T)),
        retractall(caminho(_)),
	gera_populacao(Armazens, Data, Pop),
	%write('Pop='),write(Pop),nl,
        avalia_populacao(Pop,PopAv),
        ordena_populacao(PopAv,PopOrd),
        geracoes(NG),
        gera_geracao(0,NG,PopOrd,Lim,Tempo),
        caminho(PopOrdF),
        retractall(caminho(_)).


gera_populacao(Armazens, _Data, Pop):-
        populacao(N),
        heuDist([5|Armazens], Individuo1),
        delete(Individuo1, 5, Individuo),
        N1 is N-1,
        geraPop(Individuo, N1, Populacao),
        append(Populacao, [Individuo], Pop),!.


geraPop(_Armazens, 0, []):- !.
geraPop(Armazens, N, [Individuo|Pop]):-
        random_permutation(Armazens, Individuo),
        %write(Individuo),
        N1 is N-1,
        geraPop(Armazens,N1, Pop).



avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
        %calculoRapido(Ind, V),
        calculoTotal(Ind, V),
        avalia_populacao(Resto,Resto1).


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G,G,Pop,_Lim,_Tempo):-!,(retract(caminho(_));true), asserta(caminho(Pop)),
        write('Geração '), write(G), write(':'), nl, write(Pop), nl,
        !.

gera_geracao(N,G,Pop,Lim,Tempo):-
	%write('Geração '), write(N), write(':'), nl, write(Pop), nl,
        %Evitar_cruzamentos_entre_pares_ja_definidos
        random_permutation(Pop, RandPop),
	cruzamento(RandPop, NPop1),
        mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
        ordena_populacao(NPopAv, NPopOrd),

        %Selecao_nao_elitista
        selecao_nao_elitista(Pop, NPopOrd, PopF),
        ordena_populacao(PopF,[Ind*Val|PopOrd]),

	N1 is N+1,
        statistics(runtime,[TF|_]),
        genTempoI(TI),
        TExec is TF - TI,
        %write(TExec), nl,
        ((TExec >= Tempo, gera_geracao(N1,N1,[Ind*Val|PopOrd],Lim,Tempo));
        ((Lim>0, Val =< Lim, gera_geracao(N1,N1,[Ind*Val|PopOrd],Lim, Tempo));
        (gera_geracao(N1,G,[Ind*Val|PopOrd],Lim, Tempo)))).


selecao_nao_elitista(Pop1, Pop2, Pop):-
        armazens(X),
        TopA is div(X, 4),
        ( (TopA<2, Top is 2); Top is TopA),
        Resto is X-Top,
        melhores_individuos(Pop1, Pop2, Top, PopMelhores),
        demais_individuos(Pop1, Pop2, Top, Resto,PopResto),
        append(PopMelhores,PopResto,Pop),
        !.


melhores_individuos(_P1, _P2, 0, []):-!.
melhores_individuos([H1|Pop1], [H2|Pop2], Top,[H1,H2|Pop]):-
        Top1 is Top -2,
        melhores_individuos(Pop1,Pop2,Top1,Pop).


demais_individuos(_P1, _P2, 0, 0, []):-!.

demais_individuos([H1|Pop1], [H2|Pop2], 0, Resto, [H3|Pop]):-
        Resto1 is Resto-1,
        random(1,10,Factor),
        ((Factor<5, H3 = H1); H3 = H2),
        demais_individuos(Pop1,Pop2,0,Resto1,Pop),!.

demais_individuos([_H1|Pop1], [_H2|Pop2], Top, Resto, Pop):-
        Top1 is Top -1,
        demais_individuos(Pop1,Pop2,Top1,Resto,Pop),!.




gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	armazens(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
        cruzar(Ind2,Ind1,P1,P2,NInd2));
          %Melhores_individuos_passam_para_a_geracao_seguinte
          %melhorIndividuo(Ind1, Child1, Survivor1),
          %melhorIndividuo(Ind2, Child2, Survivor2),
          %melhorIndividuo(Ind1, Survivor2, NInd1),
          %melhorIndividuo(Ind2, Survivor1, NInd2))
        %;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).


melhorIndividuo(Ind, NInd, Sobrevivente):-
        %calculoRapido(Ind, CostInd),
        %calculoRapido(NInd, CostNInd),
        calculoTotal(Ind, CostInd),
        calculoTotal(NInd, CostNInd),
        ((CostInd =< CostNInd,
          Sobrevivente=Ind);
        (Sobrevivente=NInd)).



preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	armazens(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	armazens(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	armazens(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

%----------------------------------------------------------------------------

% Distribuicao

% predicado para ver numero de camioes necessarios
pesoEntregaDiv(ListaEntrega,N,Mtotal):- soma_pesosE(ListaEntrega,Mtotal) , para(Mtotal,5000,N).

para(N1,N2,N3):- N0 is (N1/N2) , M is N0 - (N1 div N2), (M>=0.5,N3 is  (N1 div N2)+2);( N3 is (N1 div N2)+1).
%Soma_pesos_da_Entrega
soma_pesosE([],0).
soma_pesosE([Entrega|LE],PesoTotal):-
    soma_pesosE(LE,PesoAc1), entrega(Entrega,_,_,Peso,_,_),PesoTotal is Peso + PesoAc1.

%Distribui_as_entregas_entre_camioes
:- http_handler('/distribuiEntregas', distribuiEntregas, []).
distribuiEntregas(Request):- http_parameters(Request, [data(Data, [])]),
                             atom_number(Data, DataNumber),
                             entregasDia(DataNumber,L),
                             write(L),
                             prolog_to_json(201, JSONObject),
                             reply_json(JSONObject, [jsonobject(dict)]).

entregasDia(Data,Mtotal):-
        findall(Id,(entrega(Id,_,Data,_,_,_)),Entregas),
        pesoEntregaDiv(Entregas,Numero,Mtotal),

        buscarCamioes(Numero,ListaCamioes),
        findall(Massa,(entrega(_,_,Data,Massa,_,_)),Entregas1),
        rsort1(Entregas1,LE1),
        nl,write(Entregas1),nl,
        entregaComSortMassa(LE1,Data,LE),
        nl,write(LE),nl,
        N1 is Numero -1,
        distribui(LE, ListaCamioes,N1,0,N1),!.


rsort1(L1,L2):-sort(L1,Tmp),reverse(Tmp,L2).

entregaComSortMassa([],_,[]):-!.
entregaComSortMassa([Massa|LE],Data,[Id|LC]):- entrega(Id,_,Data,Massa,_,_) ,entregaComSortMassa(LE,Data,LC).
%predicado para buscar n camioes necessarios

buscarCamioes(Numero,LC) :- findall(Matricula,(camiao(Matricula,_,_,_,_,_,0)),ListaCamiao), busca(ListaCamiao,Numero,LC).

busca(_,0,[]):-!.

busca([Camiao|Camioes],Numero,[Camiao|LC]):- Numero1 is Numero - 1,busca(Camioes,Numero1,LC).

%predicado para distribuir por massa


distribui([],_ListaCamiao,_N1,_N2,_N):-!.
distribui([Entrega|Entregas], ListaCamiao, Numero1  , Numero2 ,Numero ):- retractall(empacotamento(Entrega,_,_,_,_)),
       % write(Entrega),

                                        ((Numero1 = -1, N2 is 1);((Numero1 = Numero ,N2 is 0);(N2 is Numero2))),

                                        ((N2 = 0,
                                         nth0(Numero1,ListaCamiao,X),
                                         assertz(empacotamento(Entrega,X, 0, 0, 0)),
                                         write(" " - Entrega + X - " "),
                                         %persist(),
                                         Numero11 is Numero1 - 1,distribui(Entregas,ListaCamiao,Numero11,N2,Numero) );

                                       (Numero11 is Numero1 +1,
                                        nth0(Numero11,ListaCamiao,X),
                                        assertz(empacotamento(Entrega,X, 0, 0, 0)),
                                       write(" " + Entrega + X + " "),distribui(Entregas,ListaCamiao,Numero11,N2,Numero)
                                        %persist()

                                       )).

%----------------------------------------------------------------------------
%Algoritimo Genético Original
ago(Camiao,Data,Limite,Tempo,Result):-
        listaArmazem(Camiao,Data,ListaArmazens),
        inicializa(ListaArmazens, 100, 10, 0.5, 0.25),
        gera_original(ListaArmazens, Data, [Result*_Val|_Pop], Limite, Tempo),
        !.

gera_original(Armazens, Data, PopOrdF, Lim,Tempo):-
        statistics(runtime,[T|_]),
        retractall(genTempoI(_)), asserta(genTempoI(T)),
        retractall(caminho(_)),
	gera_populacao(Armazens, Data, Pop),
	%write('Pop='),write(Pop),nl,
        avalia_populacao(Pop,PopAv),
        ordena_populacao(PopAv,PopOrd),
        geracoes(NG),
        gera_geracao_original(0,NG,PopOrd,Lim,Tempo),
        caminho(PopOrdF),
        retractall(caminho(_)).

gera_geracao_original(G,G,Pop,_Lim,_Tempo):-!,
        (retract(caminho(_));true), asserta(caminho(Pop)),
        write('Geração '), write(G), write(':'), nl, write(Pop), nl,
        !.

gera_geracao_original(N,G,Pop,Lim,Tempo):-
	%write('Geração '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop, NPop1),
        mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
        ordena_populacao(NPopAv, [Ind*Val|PopOrd]),

	N1 is N+1,
        statistics(runtime,[TF|_]),
        genTempoI(TI),
        TExec is TF - TI,

        ((TExec >= Tempo, gera_geracao(N1,N1,[Ind*Val|PopOrd],Lim,Tempo));
        ((Lim>0, Val =< Lim, gera_geracao(N1,N1,[Ind*Val|PopOrd],Lim, Tempo));
        (gera_geracao(N1,G,[Ind*Val|PopOrd],Lim, Tempo)))).

%----------------------------------------------------------------------------
%entrega("4001", 101, 20231204, 1251, 30, 30).

createEntregaGen(Id, Armazem, Data, Massa, Tempoc, Tempor, R):-
        retractall(entrega(Id, _, _, _, _, _)),
        assertz(entrega(Id, Armazem, Data, Massa, Tempoc, Tempor)),
        entregasDia(Data, _L),
        empacotamento(Id, Camiao,_,_,_),
        ag(Camiao,Data, 0, 10000, R).


deleteEntrega(Id, R):-   entrega(Id,_,Data,_,_,_),
                         retractall(entrega(Id,_,_,_,_,_)),
                         empacotamento(Id,Camiao,_,_,_),
                         retractall(empacotamento(Id,_,_,_,_)),
                         entregasDia(Data, _L),
                         ag(Camiao,Data, 0, 10000, R).

%----------------------------------------------------------------------------

algen(Camiao, Data, R):-
        entregasDia(Data, _L),
        ag(Camiao,Data, 0, 10000, R).


%----------------------------------------------------------------------------



calculoRapido([_Armazem], 0):- !.
calculoRapido([Armazem|Armazens], Custo):- calculoRapido(Armazens, NewCusto),
                                           getCusto(Armazem, Armazens, Dist),
                                           Custo is NewCusto+Dist.

getCusto(A1, [A2|_Resto], Dist):- rota(Dist,A1,A2,_,_,_).

%----------------------------------------------------------------------------
:- dynamic camiao/6.

camiao('SH-33-DD', 7500, 4500, 150, 150, 60,0).
camiao('CL-44-RA', 7500, 5500, 150, 150, 60,0).
camiao('BL-00-DD', 7500, 5500, 150, 150, 60,0).

:- dynamic rota/6.

rota(64, 5, 101, 141, 51, 24).
rota(25, 5, 102, 55, 20, 0).
rota(18, 5, 103, 48, 14, 0).
rota(11, 5, 104, 25, 0, 0).
rota(55, 5, 106, 97, 44, 0).
rota(35, 5, 107, 55, 28, 0).
rota(9, 5, 108, 29, 7, 0).
rota(30, 5, 109, 48, 24, 0).
rota(37, 5, 110, 69, 30, 0).
rota(32, 5, 111, 53, 26, 0).
rota(45, 5, 112, 95, 36, 0).
rota(25, 5, 113, 63, 20, 0).
rota(56, 5, 114, 105, 45, 0).
rota(18, 5, 115, 34, 14, 0).
rota(23, 5, 116, 46, 18, 0).
rota(9, 5, 117, 27, 7, 0).
rota(53, 101, 102, 122, 42, 0).
rota(57, 101, 103, 122, 46, 0).
rota(67, 101, 104, 151, 54, 25).
rota(65, 101, 5, 147, 52, 25).
rota(30, 101, 106, 74, 24, 0).
rota(44, 101, 107, 116, 35, 0).
rota(57, 101, 108, 141, 46, 0).
rota(92, 101, 109, 185, 74, 53).
rota(37, 101, 110, 97, 30, 0).
rota(80, 101, 111, 164, 64, 40).
rota(29, 101, 112, 76, 23, 0).
rota(83, 101, 113, 174, 66, 45).
rota(22, 101, 114, 59, 18, 0).
rota(64, 101, 115, 132, 51, 24).
rota(85, 101, 116, 181, 68, 45).
rota(56, 101, 117, 128, 45, 0).
rota(52, 102, 101, 116, 42, 0).
rota(28, 102, 103, 55, 22, 0).
rota(31, 102, 104, 74, 25, 0).
rota(27, 102, 5, 65, 22, 0).
rota(34, 102, 106, 69, 27, 0).
rota(48, 102, 107, 74, 38, 0).
rota(22, 102, 108, 61, 18, 0).
rota(55, 102, 109, 103, 44, 0).
rota(17, 102, 110, 36, 14, 0).
rota(51, 102, 111, 88, 41, 0).
rota(24, 102, 112, 61, 19, 0).
rota(53, 102, 113, 95, 42, 0).
rota(43, 102, 114, 78, 34, 0).
rota(37, 102, 115, 69, 30, 0).
rota(47, 102, 116, 99, 38, 0).
rota(18, 102, 117, 46, 14, 0).
rota(56, 103, 101, 120, 45, 0).
rota(28, 103, 102, 50, 22, 0).
rota(19, 103, 104, 46, 15, 0).
rota(18, 103, 5, 46, 14, 0).
rota(46, 103, 106, 74, 37, 0).
rota(29, 103, 107, 63, 23, 0).
rota(10, 103, 108, 38, 8, 0).
rota(45, 103, 109, 84, 36, 0).
rota(35, 103, 110, 59, 28, 0).
rota(24, 103, 111, 61, 27, 0).
rota(40, 103, 112, 67, 32, 0).
rota(36, 103, 113, 67, 29, 0).
rota(47, 103, 114, 82, 38, 0).
rota(10, 103, 115, 34, 8, 0).
rota(38, 103, 116, 80, 30, 0).
rota(13, 103, 117, 36, 10, 0).
rota(68, 104, 101, 149, 54, 25).
rota(30, 104, 102, 65, 24, 0).
rota(20, 104, 103, 46, 16, 0).
rota(12, 104, 5, 27, 10, 0).
rota(59, 104, 106, 103, 47, 0).
rota(34, 104, 107, 55, 27, 0).
rota(12, 104, 108, 36, 10, 0).
rota(32, 104, 109, 50, 26, 0).
rota(43, 104, 110, 78, 34, 0).
rota(24, 104, 111, 42, 19, 0).
rota(52, 104, 112, 97, 42, 0).
rota(14, 104, 113, 44, 11, 0).
rota(60, 104, 114, 111, 48, 0).
rota(16, 104, 115, 32, 13, 0).
rota(18, 104, 116, 53, 14, 0).
rota(14, 104, 117, 38, 11, 0).
rota(29, 106, 101, 69, 23, 0).
rota(34, 106, 102, 71, 27, 0).
rota(47, 106, 103, 74, 38, 0).
rota(58, 106, 104, 103, 46, 0).
rota(55, 106, 5, 99, 44, 0).
rota(60, 106, 107, 88, 48, 0).
rota(48, 106, 108, 92, 38, 0).
rota(83, 106, 109, 134, 66, 45).
rota(18, 106, 110, 42, 14, 0).
rota(70, 106, 111, 116, 56, 30).
rota(11, 106, 112, 23, 9, 0).
rota(73, 106, 113, 126, 58, 33).
rota(11, 106, 114, 25, 9, 0).
rota(55, 106, 115, 84, 44, 0).
rota(75, 106, 116, 132, 60, 35).
rota(47, 106, 117, 80, 38, 0).
rota(45, 107, 101, 116, 36, 0).
rota(48, 107, 102, 71, 38, 0).
rota(28, 107, 103, 61, 22, 0).
rota(32, 107, 104, 53, 26, 0).
rota(35, 107, 5, 53, 28, 0).
rota(60, 107, 106, 88, 48, 0).
rota(33, 107, 108, 59, 26, 0).
rota(60, 107, 109, 88, 48, 0).
rota(55, 107, 110, 84, 44, 0).
rota(28, 107, 111, 74, 22, 0).
rota(53, 107, 112, 82, 42, 0).
rota(39, 107, 113, 76, 31, 0).
rota(61, 107, 114, 97, 49, 21).
rota(20, 107, 115, 29, 16, 0).
rota(52, 107, 116, 84, 42, 0).
rota(38, 107, 117, 69, 30, 0).
rota(58, 108, 101, 134, 46, 0).
rota(23, 108, 102, 59, 18, 0).
rota(8, 108, 103, 32, 6, 0).
rota(12, 108, 104, 34, 10, 0).
rota(9, 108, 5, 32, 7, 0).
rota(48, 108, 106, 88, 38, 0).
rota(32, 108, 107, 57, 26, 0).
rota(37, 108, 109, 69, 30, 0).
rota(32, 108, 110, 65, 26, 0).
rota(28, 108, 111, 53, 22, 0).
rota(42, 108, 112, 82, 34, 0).
rota(30, 108, 113, 61, 24, 0).
rota(50, 108, 114, 97, 40, 0).
rota(15, 108, 115, 36, 12, 0).
rota(29, 108, 116, 65, 23, 0).
rota(7, 108, 117, 32, 6, 0).
rota(90, 109, 101, 181, 72, 50).
rota(51, 109, 102, 95, 41, 0).
rota(44, 109, 103, 86, 35, 0).
rota(30, 109, 104, 55, 24, 0).
rota(29, 109, 5, 48, 23, 0).
rota(81, 109, 106, 134, 65, 42).
rota(59, 109, 107, 95, 47, 0).
rota(35, 109, 108, 69, 28, 0).
rota(64, 109, 110, 109, 51, 24).
rota(36, 109, 111, 61, 29, 0).
rota(71, 109, 112, 132, 57, 31).
rota(24, 109, 113, 67, 19, 0).
rota(82, 109, 114, 143, 66, 45).
rota(42, 109, 115, 71, 34, 0).
rota(4, 109, 116, 15, 3, 0).
rota(35, 109, 117, 67, 28, 0).
rota(37, 110, 101, 97, 30, 0).
rota(17, 110, 102, 34, 14, 0).
rota(34, 110, 103, 59, 27, 0).
rota(41, 110, 104, 78, 33, 0).
rota(38, 110, 5, 71, 30, 0).
rota(18, 110, 106, 40, 14, 0).
rota(53, 110, 107, 82, 42, 0).
rota(30, 110, 108, 65, 24, 0).
rota(65, 110, 109, 109, 52, 25).
rota(57, 110, 111, 92, 46, 0).
rota(8, 110, 112, 32, 6, 0).
rota(58, 110, 113, 99, 46, 0).
rota(21, 110, 114, 63, 17, 0).
rota(43, 110, 115, 74, 34, 0).
rota(58, 110, 116, 105, 46, 0).
rota(29, 110, 117, 53, 23, 0).
rota(81, 111, 101, 164, 65, 42).
rota(51, 111, 102, 88, 41, 0).
rota(35, 111, 103, 65, 28, 0).
rota(22, 111, 104, 42, 18, 0).
rota(31, 111, 5, 55, 25, 0).
rota(71, 111, 106, 118, 57, 31).
rota(29, 111, 107, 74, 23, 0).
rota(29, 111, 108, 59, 23, 0).
rota(35, 111, 109, 63, 28, 0).
rota(57, 111, 110, 97, 46, 0).
rota(65, 111, 112, 111, 52, 25).
rota(9, 111, 113, 25, 7, 0).
rota(73, 111, 114, 126, 58, 33).
rota(31, 111, 115, 53, 25, 0).
rota(34, 111, 116, 59, 27, 0).
rota(34, 111, 117, 67, 27, 0).
rota(29, 112, 101, 76, 23, 0).
rota(24, 112, 102, 61, 19, 0).
rota(40, 112, 103, 67, 32, 0).
rota(51, 112, 104, 97, 41, 0).
rota(48, 112, 5, 92, 38, 0).
rota(10, 112, 106, 19, 8, 0).
rota(53, 112, 107, 82, 42, 0).
rota(41, 112, 108, 86, 33, 0).
rota(76, 112, 109, 128, 61, 0).
rota(8, 112, 110, 32, 6, 0).
rota(63, 112, 111, 109, 50, 0).
rota(66, 112, 113, 120, 53, 26).
rota(13, 112, 114, 40, 10, 0).
rota(48, 112, 115, 78, 38, 0).
rota(68, 112, 116, 126, 54, 28).
rota(40, 112, 117, 74, 32, 0).
rota(81, 113, 101, 174, 65, 42).
rota(44, 113, 102, 107, 35, 0).
rota(36, 113, 103, 74, 29, 0).
rota(14, 113, 104, 46, 11, 0).
rota(25, 113, 5, 67, 20, 0).
rota(71, 113, 106, 128, 57, 31).
rota(38, 113, 107, 80, 30, 0).
rota(25, 113, 108, 76, 20, 0).
rota(25, 113, 109, 67, 20, 0).
rota(59, 113, 110, 105, 47, 0).
rota(9, 113, 111, 27, 7, 0).
rota(65, 113, 112, 122, 52, 25).
rota(73, 113, 114, 137, 58, 33).
rota(21, 113, 115, 67, 17, 0).
rota(19, 113, 116, 59, 15, 0).
rota(27, 113, 117, 78, 22, 0).
rota(22, 114, 101, 59, 18, 0).
rota(44, 114, 102, 80, 35, 0).
rota(48, 114, 103, 80, 38, 0).
rota(58, 114, 104, 109, 46, 0).
rota(56, 114, 5, 105, 45, 0).
rota(11, 114, 106, 27, 9, 0).
rota(60, 114, 107, 97, 48, 0).
rota(48, 114, 108, 99, 38, 0).
rota(83, 114, 109, 143, 66, 45).
rota(21, 114, 110, 61, 17, 0).
rota(71, 114, 111, 122, 57, 31).
rota(13, 114, 112, 42, 10, 0).
rota(73, 114, 113, 132, 58, 35).
rota(55, 114, 115, 90, 44, 0).
rota(76, 114, 116, 139, 61, 37).
rota(47, 114, 117, 86, 38, 0).
rota(64, 115, 101, 132, 51, 24).
rota(38, 115, 102, 74, 30, 0).
rota(10, 115, 103, 34, 8, 0).
rota(15, 115, 104, 36, 12, 0).
rota(18, 115, 5, 36, 14, 0).
rota(55, 115, 106, 86, 44, 0).
rota(20, 115, 107, 34, 16, 0).
rota(16, 115, 108, 42, 13, 0).
rota(44, 115, 109, 71, 35, 0).
rota(45, 115, 110, 82, 36, 0).
rota(31, 115, 111, 53, 25, 0).
rota(48, 115, 112, 80, 38, 0).
rota(22, 115, 113, 69, 18, 0).
rota(56, 115, 114, 95, 45, 0).
rota(36, 115, 116, 69, 29, 0).
rota(21, 115, 117, 53, 17, 0).
rota(85, 116, 101, 179, 68, 45).
rota(46, 116, 102, 92, 37, 0).
rota(39, 116, 103, 84, 31, 0).
rota(20, 116, 104, 57, 16, 0).
rota(23, 116, 5, 46, 18, 0).
rota(75, 116, 106, 132, 60, 35).
rota(53, 116, 107, 92, 42, 0).
rota(29, 116, 108, 67, 23, 0).
rota(4, 116, 109, 15, 3, 0).
rota(58, 116, 110, 105, 46, 0).
rota(35, 116, 111, 57, 28, 0).
rota(65, 116, 112, 130, 52, 25).
rota(19, 116, 113, 61, 15, 0).
rota(76, 116, 114, 141, 61, 37).
rota(36, 116, 115, 69, 29, 0).
rota(30, 116, 117, 65, 24, 0).
rota(57, 117, 101, 128, 46, 0).
rota(18, 117, 102, 42, 14, 0).
rota(14, 117, 103, 40, 11, 0).
rota(16, 117, 104, 42, 13, 0).
rota(12, 117, 5, 34, 10, 0).
rota(47, 117, 106, 82, 38, 0).
rota(38, 117, 107, 74, 30, 0).
rota(8, 117, 108, 29, 6, 0).
rota(39, 117, 109, 69, 31, 0).
rota(30, 117, 110, 55, 24, 0).
rota(36, 117, 111, 69, 29, 0).
rota(37, 117, 112, 80, 30, 0).
rota(29, 117, 113, 82, 23, 0).
rota(48, 117, 114, 90, 38, 0).
rota(22, 117, 115, 53, 18, 0).
rota(31, 117, 116, 67, 25, 0).

:- dynamic armazem/8.

armazem("Armazem101", "Arouca", "Arouca", "101", "Arouca", 40.9, 8.2, 101).
armazem("Armazem102", "Espinho", "Espinho", "102", "Espinho", 41.0, 8.6, 102).
armazem("Armazem103", "Gondomar", "Gondomar", "103", "Gondomar", 42.1, 8.7, 103).
armazem("Armazem104", "Maia", "Maia", "104", "Maia", 41.2, 8.6, 104).
armazem("Armazem5", "Matosinhos", "Matosinhos", "5", "Matosinhos", 41.1, 8.6, 5).
armazem("Armazem106", "Azeméis", "Azeméis", "106", "Azeméis", 40.8, 8.4, 106).
armazem("Armazem107", "Paredes", "Paredes", "107", "Paredes", 41.2, 8.3, 107).
armazem("Armazem108", "Porto", "Porto", "108", "Porto", 41.1, 8.7, 108).
armazem("Armazem109", "Póvoa", "Póvoa", "109", "Póvoa", 41.3, 8.7, 109).
armazem("Armazem110", "Maria", "Maria", "110", "Maria", 40.9, 8.5, 110).
armazem("Armazem111", "Tirso", "Tirso", "111", "Tirso", 41.3, 8.4, 111).
armazem("Armazem112", "Madeira", "Madeira", "112", "Madeira", 40.9, 8.4, 112).
armazem("Armazem113", "Trofa", "Trofa", "113", "Trofa", 41.3, 8.5, 113).
armazem("Armazem114", "Cambra", "Cambra", "114", "Cambra", 40.8, 8.3, 114).
armazem("Armazem115", "Valongo", "Valongo", "115", "Valongo", 41.1, 8.4, 115).
armazem("Armazem116", "Conde", "Conde", "116", "Conde", 41.3, 8.7, 116).
armazem("Armazem117", "Gaia", "Gaia", "117", "Gaia", 41.1, 8.6, 117).
armazem("1d6119a1-22f0-49a4-a3ab-40445cab0585", "Armazem de Arouca", "Rua de Arouca,Arouca,1000-001", "loja01", "Arouca", 40.9321, 8.2451, 1).
armazem("fd2a9b17-9743-44ad-bf3c-5847866dcd23", "Armazem de Espinho", "Rua de Espinho,Espinho,2000-002", "loja02", "Espinho", 41.0072, 8.641, 2).
armazem("e33cf8af-968a-444b-a08e-4cd69f35370d", "Armazem do Gondomar", "Rua do Gondomar,Gondomar,3000-003", "loja03", "Gondomar", 41.1115, 8.7613, 3).
armazem("bb697dde-a399-4922-8c51-24ae0cda3309", "Armazem de Maia", "Rua de Maia,Maia,4000-004", "loja04", "Maia", 41.2279, 8.621, 4).
armazem("d75f7e2d-adac-4699-b238-70e7341f0fd8", "Armazem de Matosinhos", "Rua de Matosinhos,Matosinhos,5000-005", "loja05", "Matosinhos", 41.1844, 8.6963, 5).
armazem("5d9fa161-35ad-4564-8935-3332ae7d9d08", "Armazem de Oliveira de Azeméis", "Rua de Oliveira,Oliveira,5000-005", "loja06", "Oliveira de Azeméis", 40.8387, 8.477, 6).
armazem("02231eb6-377e-4d32-b338-07a1b075f99f", "Armazem de Paredes", "Rua de Paredes,Paredes,7000-007", "loja07", "Paredes", 41.2052, 8.3304, 7).
armazem("c92937be-49dd-49ee-a38e-b663ecdae994", "Armazem do Porto", "Rua do Porto,Porto,8000-008", "loja08", "Porto", 41.1579, 8.6291, 8).
armazem("a8331fa5-3152-49d2-882f-38c8c5f3a358", "Armazem da Póvoa", "Rua Povoa,Povoa,9000-009", "loja09", "Póvoa de Varzim", 41.3804, 8.7609, 9).
armazem("a9206012-ad9d-42cf-b9e5-dfce8e522ea0", "Armazem da Santa Maria da Feira ", "Rua Santa Maria da Feira ,Feira,1000-010", "loja10", "Santa Maria da Feira", 40.9268, 8.5483, 10).
armazem("4a3d120d-7ea8-4d11-8dd4-4448f455520e", "Armazem do Santo Tirso", "Rua do Santo Tirso,Santo Tirso,1000-010", "loja11", "Santo Tirso", 41.3431, 8.4738, 11).
armazem("4937e92a-f293-4dcf-a7d2-807bf9a4d086", "Armazem do São João da Madeira", "Rua da Madeira,Sao Joao da Madeira,1300-013", "loja13", "São João da Madeira", 40.9005, 8.4907, 13).
armazem("00a8ab7b-8be4-44fa-8978-b9c765722523", "Armazem da Trofa", "Rua da Trofa,Trofa,1400-014", "loja14", "Trofa", 41.3391, 8.56, 14).
armazem("eec53746-4788-47c9-90a0-21a3e37faa2d", "Armazem da Vale de Cambra ", "Rua da Vale de Cambra ,Vale de Cambra,1400-014", "loja14", "Vale de Cambra ", 40.843, 8.3956, 14).
armazem("0b968bae-90f0-4430-8315-6ee32f438c1d", "Armazem da Trofa", "Rua da Trofa,Trofa,1300-013", "loja13", "Trofa", 41.3391, 8.56, 13).
armazem("e75653ba-78f7-4121-bb97-80f82772e8a1", "Armazem do São João da Madeira", "Rua da Madeira,Sao Joao da Madeira,1200-012", "loja12", "São João da Madeira", 40.9005, 8.4907, 12).
armazem("b4819ad8-896b-469c-ab40-75661e89e630", "Armazem do Valongo", "Rua do Valongo,Valongo,1500-015", "loja15", "Valongo", 40.9005, 8.4907, 15).
armazem("616421aa-1b22-4899-a62f-5f7d04e37410", "Armazem de Vila do Conde", "Rua de Vila do Conde,Vila do Conde,1600-016", "loja16", "Vila do Conde", 41.3517, 8.7479, 16).
armazem("197c1094-2d1d-40c0-bc55-bb1bc034a658", "Armazem de Vila Nova de Gaia", "Rua de Vila Nova de Gaia,Vila Nova de Gaia,1700-017", "loja17", "Vila Nova de Gaia", 41.1239, 8.6118, 17).
armazem("0ca560d0-3f80-40b9-851b-a6841973673c", "Armazem de teste", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("5f5c1f64-0f13-4086-870e-40a9d3feaf00", "Armazem teste teste", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("2e4f07c0-4fac-4ca0-b260-2280d0a735a7", "Armazem de teste", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("f84ef1d7-6a2c-4d91-b624-7684885066b6", "Armazem de teste", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("bdafe31f-594c-4910-b04d-5a76588ef7ca", "Armazem testee", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("8e1f1005-1895-4f9b-80f3-88187058e088", "Armazem testee", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("fb514aaa-a0f1-4baa-81ee-0db2f5fb46a4", "Armazem testee", "Rua de teste,Paredes,7000-007", "loja02", "teste", 41.2052, 8.3304, 22).
armazem("016dcf84-5cd5-4f58-a8fc-5ac463d2a0c5", "Aramzem Grande Popular Do Porto XPO", "Rua do Renan Bola Rebola,Porto,4000-100", "Loja01", "Porto", 24.0, 48.0, 5).
armazem("f9ecf91d-ce4c-4d96-8a20-638b9f7c8845", "Aramzem Grande Popular Do Porto XPO", "Rua do Renan Bola Rebola,Porto,4000-100", "Loja01", "Porto", 24.0, 48.0, 5).
armazem("c2c8eadc-e986-4652-9b11-508b62c9a9c1", "Aramzem Grande Popular Do Porto XPO", "Rua do Renan Bola Rebola,Porto,4000-100", "Loja01", "Porto", 24.0, 48.0, 5).
armazem("18246c14-422a-4d52-8790-e9b78143a191", "Aramzem Grande Popular Do Porto XPO", "Rua do Renan Bola Rebola,Porto,4000-100", "Loja01", "Porto", 24.0, 48.0, 5).

:- dynamic entrega/6.

entrega("4001", 101, 20231204, 1251, 30, 30).
entrega("4002", 102, 20231204, 1252, 31, 31).
entrega("4003", 103, 20231204, 1253, 32, 32).
entrega("4004", 104, 20231204, 1254, 33, 33).
entrega("5001", 101, 20231205, 1501, 30, 30).
entrega("5002", 102, 20231205, 1502, 31, 31).
entrega("5003", 103, 20231205, 1503, 32, 32).
entrega("5004", 104, 20231205, 504, 33, 33).
entrega("5006", 106, 20231205, 506, 34, 34).
entrega("5007", 107, 20231205, 507, 30, 30).
entrega("5008", 108, 20231205, 508, 31, 31).
entrega("5009", 109, 20231205, 509, 32, 32).
entrega("5010", 110, 20231205, 510, 33, 33).
entrega("5011", 111, 20231205, 511, 34, 34).
entrega("6001", 101, 20231206, 20, 30, 30).
entrega("6002", 102, 20231206, 21, 31, 31).
entrega("6003", 103, 20231206, 22, 32, 32).
entrega("6004", 104, 20231206, 23, 33, 33).
entrega("6006", 106, 20231206, 24, 34, 34).
entrega("6007", 107, 20231206, 25, 34, 34).
entrega("7001", 101, 20231207, 20, 30, 30).
entrega("7002", 102, 20231207, 21, 31, 31).
entrega("7003", 103, 20231207, 22, 32, 32).
entrega("7004", 104, 20231207, 23, 33, 33).
entrega("7006", 106, 20231207, 24, 34, 34).
entrega("7007", 107, 20231207, 25, 34, 34).
entrega("7008", 108, 20231207, 25, 34, 34).
entrega("8001", 101, 20231208, 20, 30, 30).
entrega("8002", 102, 20231208, 21, 31, 31).
entrega("8003", 103, 20231208, 22, 32, 32).
entrega("8004", 104, 20231208, 23, 33, 33).
entrega("8006", 106, 20231208, 24, 34, 34).
entrega("8007", 107, 20231208, 25, 34, 34).
entrega("8008", 108, 20231208, 25, 34, 34).
entrega("8009", 109, 20231208, 25, 34, 34).
entrega("9001", 101, 20231209, 20, 30, 30).
entrega("9002", 102, 20231209, 21, 31, 31).
entrega("9003", 103, 20231209, 22, 32, 32).
entrega("9004", 104, 20231209, 23, 33, 33).
entrega("9006", 106, 20231209, 24, 34, 34).
entrega("9007", 107, 20231209, 25, 34, 34).
entrega("9008", 108, 20231209, 25, 34, 34).
entrega("9009", 109, 20231209, 25, 34, 34).
entrega("9010", 110, 20231209, 25, 34, 34).
entrega("1001", 101, 20231210, 20, 30, 30).
entrega("1002", 102, 20231210, 21, 31, 31).
entrega("1003", 103, 20231210, 22, 32, 32).
entrega("1004", 104, 20231210, 23, 33, 33).
entrega("1006", 106, 20231210, 24, 34, 34).
entrega("1007", 107, 20231210, 25, 34, 34).
entrega("1008", 108, 20231210, 25, 34, 34).
entrega("1009", 109, 20231210, 25, 34, 34).
entrega("1010", 110, 20231210, 25, 34, 34).
entrega("1011", 111, 20231210, 25, 34, 34).
entrega("1101", 101, 20231211, 21, 30, 30).
entrega("1102", 102, 20231211, 22, 31, 31).
entrega("1103", 103, 20231211, 23, 32, 32).
entrega("1104", 104, 20231211, 24, 33, 33).
entrega("1106", 106, 20231211, 25, 34, 34).
entrega("1107", 107, 20231211, 26, 34, 34).
entrega("1108", 108, 20231211, 27, 34, 34).
entrega("1109", 109, 20231211, 28, 34, 34).
entrega("1110", 110, 20231211, 29, 34, 34).
entrega("1111", 111, 20231211, 30, 34, 34).
entrega("1112", 112, 20231211, 31, 34, 34).
entrega("1201", 101, 20231212, 20, 30, 30).
entrega("1202", 102, 20231212, 21, 31, 31).
entrega("1203", 103, 20231212, 22, 32, 32).
entrega("1204", 104, 20231212, 23, 33, 33).
entrega("1206", 106, 20231212, 24, 34, 34).
entrega("1207", 107, 20231212, 25, 34, 34).
entrega("1208", 108, 20231212, 25, 34, 34).
entrega("1209", 109, 20231212, 25, 34, 34).
entrega("1210", 110, 20231212, 25, 34, 34).
entrega("1211", 111, 20231212, 25, 34, 34).
entrega("1212", 112, 20231212, 25, 34, 34).
entrega("1213", 113, 20231212, 25, 34, 34).
entrega("1301", 101, 20231213, 20, 30, 30).
entrega("1302", 102, 20231213, 21, 31, 31).
entrega("1303", 103, 20231213, 22, 32, 32).
entrega("1304", 104, 20231213, 23, 33, 33).
entrega("1306", 106, 20231213, 24, 34, 34).
entrega("1307", 107, 20231213, 25, 34, 34).
entrega("1308", 108, 20231213, 25, 34, 34).
entrega("1309", 109, 20231213, 25, 34, 34).
entrega("1310", 110, 20231213, 25, 34, 34).
entrega("1311", 111, 20231213, 25, 34, 34).
entrega("1312", 112, 20231213, 25, 34, 34).
entrega("1313", 113, 20231213, 25, 34, 34).
entrega("1314", 114, 20231213, 25, 34, 34).
entrega("1401", 101, 20231214, 20, 30, 30).
entrega("1402", 102, 20231214, 21, 31, 31).
entrega("1403", 103, 20231214, 22, 32, 32).
entrega("1404", 104, 20231214, 23, 33, 33).
entrega("1406", 106, 20231214, 24, 34, 34).
entrega("1407", 107, 20231214, 25, 34, 34).
entrega("1408", 108, 20231214, 25, 34, 34).
entrega("1409", 109, 20231214, 25, 34, 34).
entrega("1410", 110, 20231214, 25, 34, 34).
entrega("1411", 111, 20231214, 25, 34, 34).
entrega("1412", 112, 20231214, 25, 34, 34).
entrega("1413", 113, 20231214, 25, 34, 34).
entrega("1414", 114, 20231214, 25, 34, 34).
entrega("1415", 115, 20231214, 25, 34, 34).
entrega("1501", 101, 20231215, 20, 30, 30).
entrega("1502", 102, 20231215, 21, 31, 31).
entrega("1503", 103, 20231215, 22, 32, 32).
entrega("1504", 104, 20231215, 23, 33, 33).
entrega("1506", 106, 20231215, 24, 34, 34).
entrega("1507", 107, 20231215, 25, 34, 34).
entrega("1508", 108, 20231215, 25, 34, 34).
entrega("1509", 109, 20231215, 25, 34, 34).
entrega("1510", 110, 20231215, 25, 34, 34).
entrega("1511", 111, 20231215, 25, 34, 34).
entrega("1512", 112, 20231215, 25, 34, 34).
entrega("1513", 113, 20231215, 25, 34, 34).
entrega("1514", 114, 20231215, 25, 34, 34).
entrega("1515", 115, 20231215, 25, 34, 34).
entrega("1516", 116, 20231215, 25, 34, 34).
entrega("1601", 101, 20231216, 20, 30, 30).
entrega("1602", 102, 20231216, 21, 31, 31).
entrega("1603", 103, 20231216, 22, 32, 32).
entrega("1604", 104, 20231216, 23, 33, 33).
entrega("1606", 106, 20231216, 24, 34, 34).
entrega("1607", 107, 20231216, 25, 34, 34).
entrega("1608", 108, 20231216, 25, 34, 34).
entrega("1609", 109, 20231216, 25, 34, 34).
entrega("1610", 110, 20231216, 25, 34, 34).
entrega("1611", 111, 20231216, 25, 34, 34).
entrega("1612", 112, 20231216, 25, 34, 34).
entrega("1613", 113, 20231216, 25, 34, 34).
entrega("1614", 114, 20231216, 25, 34, 34).
entrega("1615", 115, 20231216, 25, 34, 34).
entrega("1616", 116, 20231216, 25, 34, 34).
entrega("1617", 117, 20231216, 25, 34, 34).
entrega("8001", 101, 20231225, 20.0, 30, 30).
entrega("8002", 102, 20231225, 21.0, 31, 31).
entrega("8003", 103, 20231225, 22.0, 32, 32).
entrega("8004", 104, 20231225, 23.0, 33, 33).
entrega("8006", 106, 20231225, 24.0, 34, 34).
entrega("9001", 101, 20231224, 20, 30, 30).
entrega("9002", 102, 20231224, 21, 31, 31).
entrega("9003", 103, 20231224, 22, 32, 32).
entrega("9004", 104, 20231224, 23, 33, 33).
entrega("9006", 106, 20231224, 24, 34, 34).
entrega("9007", 107, 20231224, 25, 35, 35).
entrega("9008", 108, 20231224, 21, 31, 31).
entrega("9009", 109, 20231224, 22, 32, 32).
entrega("9010", 110, 20231224, 23, 33, 33).
entrega("9011", 111, 20231224, 24, 34, 34).
entrega("11ac2786-899c-4691-8ef5-4624d37ff7c8", 1, 20221201, 200.0, 20, 15).
entrega("94262841-4362-4a76-b761-5806c792153a", 9, 20221201, 300.0, 25, 20).
entrega("a3242211-1ded-40f8-9cfa-f6431351af6a", 11, 20221201, 150.0, 15, 10).
entrega("08fa2bc6-a4f1-4e13-8fb3-cf0076e9dc04", 3, 20221201, 400.0, 35, 40).
entrega("30a0b421-7104-44d9-8cef-16b17912158a", 7, 20221204, 150.0, 12, 15).
entrega("08b3030e-5d6a-460a-b076-d2f777870825", 7, 20221203, 150.0, 12, 15).
entrega("727ccefe-6e98-4b10-a737-d56701de8f26", 7, 20221202, 150.0, 12, 15).
entrega("5e3651c9-96c0-426c-b631-039ddff5b338", 2, 20221202, 200.0, 25, 25).
entrega("f1728763-056b-4960-bd3d-120da01d6dc3", 2, 20221203, 200.0, 25, 25).
entrega("890b0113-fae7-4eed-968d-615a4f1d348a", 2, 20221204, 200.0, 25, 25).
entrega("25cc9556-0b2e-46ca-ae04-d2fbf5790108", 2, 20221205, 200.0, 25, 25).
entrega("8ec5a493-6c23-48bd-8a86-efb776e9f532", 6, 20221205, 100.0, 10, 10).
entrega("d600cb6e-078a-408c-8f50-7316af41021d", 6, 20221204, 100.0, 10, 10).
entrega("6e8e06ee-8c73-426f-87fb-cf0dec87b461", 6, 20221203, 100.0, 10, 10).
entrega("7e4ddb0c-ed3b-43c5-851b-56782f2e987a", 6, 20221202, 100.0, 10, 10).
entrega("98d7f582-0604-48f6-8125-bb7b500b8fff", 6, 20221130, 100.0, 10, 10).
entrega("fe0d6f87-fd08-41eb-b41b-abf0ffea712a", 6, 20221129, 100.0, 10, 10).
entrega("c8c0067e-78b1-46c5-b694-7451d83831fd", 6, 20221231, 888.0, 80, 80).
entrega("f11c2df4-f922-4c5f-b2ca-1406e38c7c45", 9, 20221215, 22.0, 5, 6).
entrega("91a93f36-2db4-4eb3-8fee-1b451cd1d269", 1, 20221227, 100.0, 10, 15).
entrega("0f97f178-3c14-4790-8843-d71e755a4956", 4, 20221216, 500.0, 60, 60).

:- dynamic empacotamento/5.

empacotamento("4001", 'BL-00-DD', 0, 0, 0).
empacotamento("4002", 'BL-00-DD', 1, 0, 0).
empacotamento("4003", 'BL-00-DD', 2, 0, 0).
empacotamento("4004", 'BL-00-DD', 3, 0, 0).
empacotamento("6001", 'BL-00-DD', 0, 0, 0).
empacotamento("6002", 'BL-00-DD', 1, 0, 0).
empacotamento("6003", 'BL-00-DD', 2, 0, 0).
empacotamento("6004", 'BL-00-DD', 3, 0, 0).
empacotamento("6006", 'BL-00-DD', 3, 0, 0).
empacotamento("6007", 'BL-00-DD', 3, 0, 0).
empacotamento("8001", 'BL-00-DD', 0, 0, 0).
empacotamento("8002", 'BL-00-DD', 1, 0, 0).
empacotamento("8003", 'BL-00-DD', 2, 0, 0).
empacotamento("8004", 'BL-00-DD', 3, 0, 0).
empacotamento("8006", 'BL-00-DD', 3, 0, 0).
empacotamento("8007", 'BL-00-DD', 3, 0, 0).
empacotamento("8008", 'BL-00-DD', 3, 0, 0).
empacotamento("8009", 'BL-00-DD', 3, 0, 0).

empacotamento("1001", 'BL-00-DD', 0, 0, 0).
empacotamento("1002", 'BL-00-DD', 1, 0, 0).
empacotamento("1003", 'BL-00-DD', 2, 0, 0).
empacotamento("1004", 'BL-00-DD', 3, 0, 0).
empacotamento("1006", 'BL-00-DD', 3, 0, 0).
empacotamento("1007", 'BL-00-DD', 3, 0, 0).
empacotamento("1008", 'BL-00-DD', 3, 0, 0).
empacotamento("1009", 'BL-00-DD', 3, 0, 0).
empacotamento("1010", 'BL-00-DD', 3, 0, 0).
empacotamento("1011", 'BL-00-DD', 3, 0, 0).

empacotamento("1201", 'BL-00-DD', 0, 0, 0).
empacotamento("1202", 'BL-00-DD', 1, 0, 0).
empacotamento("1203", 'BL-00-DD', 2, 0, 0).
empacotamento("1204", 'BL-00-DD', 3, 0, 0).
empacotamento("1206", 'BL-00-DD', 3, 0, 0).
empacotamento("1207", 'BL-00-DD', 3, 0, 0).
empacotamento("1208", 'BL-00-DD', 3, 0, 0).
empacotamento("1209", 'BL-00-DD', 3, 0, 0).
empacotamento("1210", 'BL-00-DD', 3, 0, 0).
empacotamento("1211", 'BL-00-DD', 3, 0, 0).
empacotamento("1212", 'BL-00-DD', 3, 0, 0).
empacotamento("1213", 'BL-00-DD', 3, 0, 0).
empacotamento("1401", 'BL-00-DD', 0, 0, 0).
empacotamento("1402", 'BL-00-DD', 1, 0, 0).
empacotamento("1403", 'BL-00-DD', 2, 0, 0).
empacotamento("1404", 'BL-00-DD', 3, 0, 0).
empacotamento("1406", 'BL-00-DD', 3, 0, 0).
empacotamento("1407", 'BL-00-DD', 3, 0, 0).
empacotamento("1408", 'BL-00-DD', 3, 0, 0).
empacotamento("1409", 'BL-00-DD', 3, 0, 0).
empacotamento("1410", 'BL-00-DD', 3, 0, 0).
empacotamento("1411", 'BL-00-DD', 3, 0, 0).
empacotamento("1412", 'BL-00-DD', 3, 0, 0).
empacotamento("1413", 'BL-00-DD', 3, 0, 0).
empacotamento("1414", 'BL-00-DD', 3, 0, 0).
empacotamento("1415", 'BL-00-DD', 3, 0, 0).
empacotamento("1501", 'BL-00-DD', 0, 0, 0).
empacotamento("1502", 'BL-00-DD', 1, 0, 0).
empacotamento("1503", 'BL-00-DD', 2, 0, 0).
empacotamento("1504", 'BL-00-DD', 3, 0, 0).
empacotamento("1506", 'BL-00-DD', 3, 0, 0).
empacotamento("1507", 'BL-00-DD', 3, 0, 0).
empacotamento("1508", 'BL-00-DD', 3, 0, 0).
empacotamento("1509", 'BL-00-DD', 3, 0, 0).
empacotamento("1510", 'BL-00-DD', 3, 0, 0).
empacotamento("1511", 'BL-00-DD', 3, 0, 0).
empacotamento("1512", 'BL-00-DD', 3, 0, 0).
empacotamento("1513", 'BL-00-DD', 3, 0, 0).
empacotamento("1514", 'BL-00-DD', 3, 0, 0).
empacotamento("1515", 'BL-00-DD', 3, 0, 0).
empacotamento("1516", 'BL-00-DD', 3, 0, 0).
empacotamento("1601", 'BL-00-DD', 0, 0, 0).
empacotamento("1602", 'BL-00-DD', 1, 0, 0).
empacotamento("1603", 'BL-00-DD', 2, 0, 0).
empacotamento("1604", 'BL-00-DD', 3, 0, 0).
empacotamento("1606", 'BL-00-DD', 3, 0, 0).
empacotamento("1607", 'BL-00-DD', 3, 0, 0).
empacotamento("1608", 'BL-00-DD', 3, 0, 0).
empacotamento("1609", 'BL-00-DD', 3, 0, 0).
empacotamento("1610", 'BL-00-DD', 3, 0, 0).
empacotamento("1611", 'BL-00-DD', 3, 0, 0).
empacotamento("1612", 'BL-00-DD', 3, 0, 0).
empacotamento("1613", 'BL-00-DD', 3, 0, 0).
empacotamento("1614", 'BL-00-DD', 3, 0, 0).
empacotamento("1615", 'BL-00-DD', 3, 0, 0).
empacotamento("1616", 'BL-00-DD', 3, 0, 0).
empacotamento("1617", 'BL-00-DD', 3, 0, 0).
empacotamento("8001", 'BL-00-DD', 0, 0, 0).
empacotamento("8002", 'BL-00-DD', 1, 0, 0).
empacotamento("8003", 'BL-00-DD', 2, 0, 0).
empacotamento("8004", 'BL-00-DD', 3, 0, 1).
empacotamento("8006", 'BL-00-DD', 0, 1, 0).
empacotamento("9011", 'BL-00-DD', 3, 3, 0).

empacotamento("1101", 'BL-00-DD', 0, 0, 0).
empacotamento("1102", 'BL-00-DD', 0, 0, 0).
empacotamento("1103", 'BL-00-DD', 0, 0, 0).
empacotamento("1104", 'BL-00-DD', 0, 0, 0).
empacotamento("1106", 'BL-00-DD', 0, 0, 0).
empacotamento("1107", 'BL-00-DD', 0, 0, 0).
empacotamento("1108", 'BL-00-DD', 0, 0, 0).
empacotamento("1109", 'BL-00-DD', 0, 0, 0).
empacotamento("1110", 'BL-00-DD', 0, 0, 0).
empacotamento("1111", 'BL-00-DD', 0, 0, 0).
empacotamento("1112", 'BL-00-DD', 0, 0, 0).

empacotamento("9001", 'BL-00-DD', 0, 0, 0).
empacotamento("9002", 'BL-00-DD', 0, 0, 0).
empacotamento("9003", 'BL-00-DD', 0, 0, 0).
empacotamento("9004", 'BL-00-DD', 0, 0, 0).
empacotamento("9006", 'BL-00-DD', 0, 0, 0).
empacotamento("9007", 'BL-00-DD', 0, 0, 0).
empacotamento("9008", 'BL-00-DD', 0, 0, 0).
empacotamento("9009", 'BL-00-DD', 0, 0, 0).
empacotamento("9010", 'BL-00-DD', 0, 0, 0).

empacotamento("7001", 'BL-00-DD', 0, 0, 0).
empacotamento("7002", 'BL-00-DD', 0, 0, 0).
empacotamento("7003", 'BL-00-DD', 0, 0, 0).
empacotamento("7004", 'BL-00-DD', 0, 0, 0).
empacotamento("7006", 'BL-00-DD', 0, 0, 0).
empacotamento("7007", 'BL-00-DD', 0, 0, 0).
empacotamento("7008", 'BL-00-DD', 0, 0, 0).

empacotamento("1301", 'BL-00-DD', 0, 0, 0).
empacotamento("1302", 'SH-33-DD', 0, 0, 0).
empacotamento("1303", 'BL-00-DD', 0, 0, 0).
empacotamento("1304", 'SH-33-DD', 0, 0, 0).
empacotamento("1306", 'BL-00-DD', 0, 0, 0).
empacotamento("1307", 'SH-33-DD', 0, 0, 0).
empacotamento("1308", 'BL-00-DD', 0, 0, 0).
empacotamento("1309", 'SH-33-DD', 0, 0, 0).
empacotamento("1310", 'BL-00-DD', 0, 0, 0).
empacotamento("1311", 'SH-33-DD', 0, 0, 0).
empacotamento("1312", 'BL-00-DD', 0, 0, 0).
empacotamento("1313", 'SH-33-DD', 0, 0, 0).
empacotamento("1314", 'BL-00-DD', 0, 0, 0).
empacotamento("5001", 'BL-00-DD', 0, 0, 0).
empacotamento("5002", 'SH-33-DD', 0, 0, 0).
empacotamento("5003", 'BL-00-DD', 0, 0, 0).
empacotamento("5004", 'SH-33-DD', 0, 0, 0).
empacotamento("5006", 'BL-00-DD', 0, 0, 0).

%----------------------------------------------------------------------------

/*
:- Port is 2228,
   gethostname(Host),
   format('~nHTTP server ready:  http://~w:~w ~n~n',[Host,Port]),
   ensure_loaded('inc1'),
   ensure_loaded('inc2'),
   ensure_loaded('inc3'),
   listing(camiao/6), told,
   listing(rota/6), told,
   listing(empacotamento/5), told,
   listing(armazem/8), told,
   listing(entrega/6), told,
   http_daemon([port(Port),user(root),fork(false)]).*/
