/* eslint-disable prettier/prettier */
export interface IPlanoPersistence {
  domainId: string;
  matricula: string;
  date: number;
  armazens: string[];
  entregas: string[][];
}