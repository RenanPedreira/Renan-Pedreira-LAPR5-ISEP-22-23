import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RotaTempoCarregamentoExtraProps {
  value: number;
}

export class RotaTempoCarregamentoExtra extends ValueObject<RotaTempoCarregamentoExtraProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: RotaTempoCarregamentoExtraProps) {
    super(props);
  }

  public static create (tempoCarregamentoExtra: number): Result<RotaTempoCarregamentoExtra> {
    const guardResult = Guard.againstNullOrUndefined(tempoCarregamentoExtra, 'tempoCarregamentoExtra');
    if (!guardResult.succeeded) {
      return Result.fail<RotaTempoCarregamentoExtra>(guardResult.message);
    } else if (tempoCarregamentoExtra < 0) {
      return Result.fail<RotaTempoCarregamentoExtra>("Tempo de carregamento extra não pode ser negativo");
    }else {
      return Result.ok<RotaTempoCarregamentoExtra>(new RotaTempoCarregamentoExtra({ value: tempoCarregamentoExtra }))
    }
  }
}