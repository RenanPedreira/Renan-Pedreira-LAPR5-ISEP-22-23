export interface Rota {
  id: string;
  distancia: number;
  armazemOrigem: number;
  armazemDestino: number;
  tempoPercorrer: number;
  tempoCarregamento: number;
  tempoCarregamentoExtra: number;
}