/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanoArmazemProps {
  value: string[];
}

export class PlanoArmazem extends ValueObject<PlanoArmazemProps> {
  get value (): string[] {
    return this.props.value;
  }
  
  private constructor (props: PlanoArmazemProps) {
    super(props);
  }

  public static create (armazem: string[]): Result<PlanoArmazem> {
    const guardResult = Guard.againstNullOrUndefined(armazem, 'armazem');
    // if (!guardResult.succeeded) {
    //   return Result.fail<PlanoArmazem>(guardResult.message);
    // }
    
    //else {
      return Result.ok<PlanoArmazem>(new PlanoArmazem({ value: armazem }))
    //}
  }
  
}