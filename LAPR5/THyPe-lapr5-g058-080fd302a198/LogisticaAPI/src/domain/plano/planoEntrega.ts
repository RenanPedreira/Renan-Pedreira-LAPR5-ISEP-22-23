/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanoEntregaProps {
  value: string[][];
}

export class PlanoEntrega extends ValueObject<PlanoEntregaProps> {
  get value (): string[][] {
    return this.props.value;
  }
  
  private constructor (props: PlanoEntregaProps) {
    super(props);
  }

  public static create (entrega: string[][]): Result<PlanoEntrega> {
    const guardResult = Guard.againstNullOrUndefined(entrega, 'entrega');
    // if (!guardResult.succeeded) {
    //   return Result.fail<PlanoEntrega>(guardResult.message);
    // }
    
    // else {
      return Result.ok<PlanoEntrega>(new PlanoEntrega({ value: entrega }))
    //}
  }
  
}