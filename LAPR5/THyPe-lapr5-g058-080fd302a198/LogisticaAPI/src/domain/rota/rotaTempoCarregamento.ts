import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RotaTempoCarregamentoProps {
  value: number;
}

export class RotaTempoCarregamento extends ValueObject<RotaTempoCarregamentoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: RotaTempoCarregamentoProps) {
    super(props);
  }

  public static create (tempoCarregamento: number): Result<RotaTempoCarregamento> {
    const guardResult = Guard.againstNullOrUndefined(tempoCarregamento, 'tempoCarregamento');
    if (!guardResult.succeeded) {
      return Result.fail<RotaTempoCarregamento>(guardResult.message);
    } else if (tempoCarregamento < 0) {
      return Result.fail<RotaTempoCarregamento>("Tempo de carregamento não pode ser negativo");
    } else {
      return Result.ok<RotaTempoCarregamento>(new RotaTempoCarregamento({ value: tempoCarregamento }))
    }
  }
}