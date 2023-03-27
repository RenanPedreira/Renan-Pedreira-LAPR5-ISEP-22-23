/* eslint-disable prettier/prettier */
export default interface ICamiaoDTO {
    id: string;
    tara: number;
    cargaKg: number;
    cargaKWh: number;
    autonomia : number;
    tempoCarregamentoRapido : number;
    ativado: boolean;
}