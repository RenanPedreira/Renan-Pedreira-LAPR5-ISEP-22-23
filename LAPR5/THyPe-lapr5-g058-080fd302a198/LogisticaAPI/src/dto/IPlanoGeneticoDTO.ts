/* eslint-disable prettier/prettier */
export default interface IPlanoGeneticoDTO {
    id: string;
    matricula: string;
    date: number;
    limite: number;
    tempo: number;
    geracoes: number;
    populacao: number;
    probCruzamento: number;
    probMutacao: number;
}