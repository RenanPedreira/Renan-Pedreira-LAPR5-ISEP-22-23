/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoTempoCarregamentoRapidoProps {
  value: number;
}

export class CamiaoTempoCarregamentoRapido extends ValueObject<CamiaoTempoCarregamentoRapidoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoTempoCarregamentoRapidoProps) {
    super(props);
  }

  public static create (tempoCarregamentoRapido: number): Result<CamiaoTempoCarregamentoRapido> {
    const guardResult = Guard.againstNullOrUndefined(tempoCarregamentoRapido, 'tempoCarregamentoRapido');

    if (!guardResult.succeeded) {
      return Result.fail<CamiaoTempoCarregamentoRapido>(guardResult.message);
    } 
    
    else if(tempoCarregamentoRapido<=0) {
      return Result.fail<CamiaoTempoCarregamentoRapido>("Tempo de carregamento rápido não pode ser menor ou igual a zero.\n");
    } 

    else {
      return Result.ok<CamiaoTempoCarregamentoRapido>(new CamiaoTempoCarregamentoRapido({ value: tempoCarregamentoRapido }))
    }
  }
}