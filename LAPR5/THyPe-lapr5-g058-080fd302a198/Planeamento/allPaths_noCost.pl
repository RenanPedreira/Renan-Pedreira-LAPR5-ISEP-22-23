%Camiões
camiao('AA-11-AA',7500,4300,80,100,60).
camiao('BB-22-BB',7600,4400,90,110,60).

:-dynamic custo_min/2.
:-dynamic tempo_min/2.

%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
carateristicasCam(eTruck01,7500,4300,80,100,60).

%Armazens
idArmazen('Arouca', 1).
idArmazen('Espinho', 2).
idArmazen('Gondomar', 3).
idArmazem('Maia',4).
idArmazem('Matosinhos',5).
idArmazem('Oliveira de Azemeis',6).
idArmazem('Paredes',7).
idArmazem('Porto',8).
idArmazem('Povoa de Varzim',9).
idArmazem('Santa Maria da Feira',10).
idArmazem('Santo Tirso',11).
idArmazem('Sao Joao da Madeira',12).
idArmazem('Trofa',13).
idArmazem('Vale de Cambra',14).
idArmazem('Valongo',15).
idArmazem('Vila do Conde',16).
idArmazem('Vila Nova de Gaia',17).

%Matosinhos
armazem_base(5).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,2,122,42,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).

% entrega(<idEntrega>,<data>,<massaEntrega>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
entrega(4439, 20221205, 200, 1, 8, 10).
entrega(4438, 20221205, 150, 9, 7, 9).
entrega(4445, 20221205, 100, 3, 5, 7).
entrega(4443, 20221205, 120, 8, 6, 8).
entrega(4449, 20221205, 300, 11, 15, 20).

entregasArmazens([1,9,3,8,11]).

%Tara do camião / Autonomia do camiao / Carga Inicial / tempo de carga
%tara(T):-carateristicasCam(_,T,_,_,_,_).
%tcarregamento(T):-carateristicasCam(_,_,_,_,_,T).
%autonomiamax(A):-carateristicasCam(_,_,_,_,A,_).
%cargainicial(C):-carateristicasCam(_,_,_,C,_,_).
%cargamax(C):-carateristicasCam(_,_,C,_,_,_).

tara(T):-camiao(_,T,_,_,_,_).
tcarregamento(T):-camiao(_,_,_,_,_,T).
autonomiamax(A):-camiao(_,_,_,_,A,_).
cargainicial(C):-camiao(_,_,_,C,_,_).
cargamax(C):-camiao(_,_,C,_,_,_).


%Imports
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

%Encontra todos os caminhos sem o armazem de matosinhos
caminhosOG(Armazens, Caminhos):- findall(Caminho,permutation(Armazens,Caminho),Caminhos).


%Encontra todos os caminhos
caminhos(Armazens, Caminhos):- armazem_base(Base),
                               findall(CaminhoCompleto,
                                       (permutation(Armazens,Caminho),
                                       append([Base|Caminho],[Base],CaminhoCompleto)
                                       %,write(CaminhoCompleto)
                                       ),
                                       Caminhos).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Avaliar trajetórias de acordo com o tempo para completar todas
% as entregas e voltar ao armazém base de Matosinhos e escolher a
% solução que permite a volta com o camião mais cedo

%Soma pesos da Entrega
soma_pesos([],[],0).
soma_pesos([Cidade|LC],[PesoAc|LP],PesoAc):-
    soma_pesos(LC,LP,PesoAc1),entrega(_,Cidade,_,Peso,_,_),PesoAc is Peso+PesoAc1.

%Acrescenta a tara do camião
acrescenta_tara(Tara,[],[Tara]).
acrescenta_tara(Tara,[Peso|LP],[PesoTara|LPT]):-
    acrescenta_tara(Tara,LP,LPT),
    PesoTara is Peso+Tara.

%Calcula o custo da viagem sem paragens
calcula_custo_viagem(LC,Custo):-
    soma_pesos(LC,LP,_),
    tara(Tara),
    cargamax(Carga),

    acrescenta_tara(Tara,LP,LPT),
    armazem_base(Base),
    append([Base|LC],[Base],LCcompleto),
    custo(LCcompleto,LPT,Custo,Tara,Carga).

custo([_],[],0,_,_).
custo([C1,C2|LCcompleto],[PT|LPT],Custo,Tara,Carga):-
    custo([C2|LCcompleto],LPT,Custo1,Tara,Carga),
    (rota(_,C1,C2,T,_,_);rota(_,C2,C1,T,_,_)),
    Custo is Custo1+T*(PT/(Tara+Carga)). %, Autonomia is Autonomia1 + R * (PT/(Tara+Carga)).

%a calcula custo das paragens
calcula_custo_paragem(LE,Tempo):-
armazem_base(Base),
cargainicial(Autonomia),
soma_pesos(LE,LP,_),
tara(Tara),
acrescenta_tara(Tara,LP,LPT),
append([Base|LE],[Base],LEcompleto),
custo_paragem(LEcompleto,Autonomia,Tempo,LPT).

custo_paragem([_],_,0,[]).
custo_paragem([Cidade1,Cidade2|LE],Autonomia,Tempo,[MassaCamiao|LPT]):-  ((Cidade1 == 5  ,calculaEnergiaParaProximaCidade(Cidade1,Cidade2,MassaCamiao,Energia), Autonomia1 is Autonomia - Energia ,custo_paragem([Cidade2|LE],Autonomia1,Tempo,LPT) ));
(rota(_,Cidade1,Cidade2,_,_,TempoExtra), calculaEnergiaParaProximaCidade(Cidade1,Cidade2,MassaCamiao,Energia),entrega(_,Cidade1,_,_,_,TempoRetirar),TempoExtra1 is TempoExtra ,TempoExtra2 is TempoRetirar,cargainicial(CM)),

    ((TempoExtra\=0,!,True = 0 );(True=1)), Autonomia1 is Autonomia - Energia  ,

    ( Cidade2\=5  ,((Autonomia1< (CM*0.2), !, tcarregamento20_80(Autonomia,Tcarregar),((True==0,EnergiaDoTrosso  is (CM * 0.2));EnergiaDoTrosso  is (CM * 0.8) -Autonomia) ,((Tcarregar>TempoExtra2, Tfinal1 is TempoExtra1 + Tcarregar );Tfinal1 is TempoExtra2+TempoExtra1));((Tfinal1 is TempoExtra2),((True==0,EnergiaDoTrosso  is (CM * 0.2));EnergiaDoTrosso is Autonomia1)));

    ((Autonomia1<(CM*0.2), !, tcarregamentoFinal(Autonomia,Energia,Tcarregar),((True==0,EnergiaDoTrosso is (CM * 0.2));EnergiaDoTrosso  is (CM * 0.8) -Autonomia) ,((Tcarregar>TempoExtra2, Tfinal1 is TempoExtra1 + Tcarregar );Tfinal1 is TempoExtra2+TempoExtra1));((Tfinal1 is TempoExtra2),((True==0,EnergiaDoTrosso  is (CM * 0.2));EnergiaDoTrosso is Autonomia1))))


    ,custo_paragem([Cidade2|LE],EnergiaDoTrosso,Tempo1,LPT),



Tempo is Tempo1 + Tfinal1.

tcarregamento20_80(Autonomia,Tcarga):- buscarCarregamentoMaxTempo(Carga,Tempo),  Tcarga is ((Carga*0.8) - Autonomia) * (Tempo/48).

tcarregamentoFinal(Autonomia1,Autonomia2,Tcarga):- buscarCarregamentoMaxTempo(Carga,Tempo), ((Autonomia2>Autonomia1,Tcarga is ((Carga*0.2) - (Autonomia2 - Autonomia1)) * (Tempo/48));(Tcarga is ((Carga*0.2) - (Autonomia1 - Autonomia2)*(Tempo/48))))  .

buscarCarregamentoMaxTempo(Carga,Tempo):-cargainicial(Carga) , tcarregamento(Tempo) .

calculaEnergiaParaProximaCidade(C1,C2,M,E):- tara(Tara), cargamax(Carga), (rota(_,C1,C2,_,A1,_);rota(_,C2,C1,_,A1,_)), E is (A1*(M/(Tara+Carga))).

calculoTotal(LE,TF):- calcula_custo_paragem(LE,Tempo), calcula_custo_viagem(LE,Tempo1), TF is Tempo + Tempo1 .



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Heuristica para efetuar de seguida a entrega com maior massa

heuristicaMaiorMassa([Armazem|Armazens], CaminhoFinal):- calculaMassa(Armazem, Armazens, Caminho),
                                                append([5|Caminho], [5], CaminhoFinal).


calculaMassa(_,[],[]):-!.
calculaMassa(Armazem, Armazens, [ArmazemProximo|Caminho]):-  retractall(armazemProximo(_,_)),
                                                              asserta(armazemProximo(5,0)),
                                                              calculaMaiorMassa(Armazem, Armazens),
                                                              armazemProximo(ArmazemProximo,_),
                                                              delete(Armazens, ArmazemProximo, ArmazensRestantes),
                                                              calculaMassa(ArmazemProximo, ArmazensRestantes, Caminho).

calculaMaiorMassa(_,[]):-!.
calculaMaiorMassa(Armazem, [Current|Armazens]):- rota(_, Armazem, Current,_,_,_),
    entrega(_,ArmazemProximo,_,Massa,_,_),
    armazemProximo(ArmazemProximo, MassaAtual),
    (Massa>MassaAtual,retractall(armazemProximo(ArmazemProximo,_)),
     asserta(armazemProximo(Current, Massa)),findClosestDist(Armazem, Armazens));
    calculaMaiorMassa(Armazem, Armazens).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Servidor

% Gerir servidor
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).


% Funções do Servidor
%Cors
:- set_setting(http:cors, [*]).

%Encontra todos os caminhos
:- http_handler('/todosCaminhos', todosCaminhos, []).
todosCaminhos(Request):- http_parameters(Request, [armazem(Armazem, [list])]),                             atomToList(Armazem, Armazens),
                         caminhos(Armazens, C),
                         prolog_to_json(C, JSONObject),
                         reply_json(JSONObject, [json_object(dict)]).

%Predicados adicionais
listStringToInt([], []):-!.
listStringToInt([S|StringList], [N|NumberList]):- number_string(N,S),
                                              listStringToInt(StringList, NumberList).


atomToList(Atom, IntList):- atom_string(Atom, String),
                         split_string(String, ",","", ListString),
                         listStringToInt(ListString, IntList).


%Access form browser
%http://localhost:5000/todosCaminhos?armazem=2,3,4







%Sequência de menor custo
%seq_custo_min(LC,Custo):-(run;true),custo_min(LC,Custo).

%run:-
%    retractall(custo_min(_,_)),
%    assertz(custo_min(_,100000)),
%    findall(Cidade,entrega(_,_,_,Cidade,_,_),LC),
%    permutation(LC,LCPerm),
%    calcula_custo_viagem(LCPerm,Custo),
%    atualiza(LCPerm,Custo),
%    fail.

%atualiza(LCPerm,Custo):-
%  custo_min(_,CustoMin),
%  ((Custo<CustoMin,!,retract(custo_min(_,_)),assertz(custo_min(LCPerm,Custo)),

%    write(Custo),nl)
%    ;true).
%%%%%%%%%%%%%%%%%%%%%%%%%%
%menor custo de tempo e mostra o caminho


%b seq_custo_min
%seq_tempo_min(LE,Tempo):-(run;true),tempo_min(LE,Tempo).

%run:-
%retractall(tempo_min(_,_)),
%assertz(tempo_min(_,1000000)),
%entregasArmazens(LEsc),
%permutation(LEsc,LEPerm),
%calculoTotal(LEPerm,Tempo),
%atualiza(LEPerm,Tempo),
%fail.
%atualiza(LEPerm,Tempo):-
%tempo_min(_,TempoMin),
%((Tempo<TempoMin,!,retract(tempo_min(_,_)),
%assertz(tempo_min(LEPerm,Tempo)),
% write('Tempo='),write(Tempo), write(' '),write(LEPerm), nl)
%;true).
% os writes so para ver a atualizacao do menor tempo
