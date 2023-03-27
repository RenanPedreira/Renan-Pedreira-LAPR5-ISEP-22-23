import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RotaTempoPercorrerProps {
  value: number;
}

export class RotaTempoPercorrer extends ValueObject<RotaTempoPercorrerProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: RotaTempoPercorrerProps) {
    super(props);
  }

  public static create (tempoPercorrer: number): Result<RotaTempoPercorrer> {
    const guardResult = Guard.againstNullOrUndefined(tempoPercorrer, 'tempoPercorrer');
    if (!guardResult.succeeded) {
      return Result.fail<RotaTempoPercorrer>(guardResult.message);
    } else if (tempoPercorrer < 0) {
      return Result.fail<RotaTempoPercorrer>("Tempo não pode ser negativo");
    }else {
      return Result.ok<RotaTempoPercorrer>(new RotaTempoPercorrer({ value: tempoPercorrer }))
    }
  }
}