import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RotaDistanciaProps {
  value: number;
}

export class RotaDistancia extends ValueObject<RotaDistanciaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: RotaDistanciaProps) {
    super(props);
  }

  public static create (distancia: number): Result<RotaDistancia> {
    const guardResult = Guard.againstNullOrUndefined(distancia, 'distancia');

    if (!guardResult.succeeded) {
      return Result.fail<RotaDistancia>(guardResult.message);
    } else if (distancia < 0) {
      return Result.fail<RotaDistancia>("Distância não pode ser negativa");
    }else {
      return Result.ok<RotaDistancia>(new RotaDistancia({ value: distancia }))
    }
  }
}