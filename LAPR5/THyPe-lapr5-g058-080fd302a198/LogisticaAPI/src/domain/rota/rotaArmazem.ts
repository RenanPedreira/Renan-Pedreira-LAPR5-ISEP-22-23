import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RotaArmazemProps {
  value: number;
}

export class RotaArmazem extends ValueObject<RotaArmazemProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: RotaArmazemProps) {
    super(props);
  }

  public static create (armazem: number): Result<RotaArmazem> {
    const guardResult = Guard.againstNullOrUndefined(armazem, 'armazem');

    if (!guardResult.succeeded) {
      return Result.fail<RotaArmazem>(guardResult.message);
    } else {
      return Result.ok<RotaArmazem>(new RotaArmazem({ value: armazem }))
    }
  }
}