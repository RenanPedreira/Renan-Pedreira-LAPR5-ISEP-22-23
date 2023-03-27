/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EmpacotamentoPosicaoXProps {
  value: number;
}

export class EmpacotamentoPosicaoX extends ValueObject<EmpacotamentoPosicaoXProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EmpacotamentoPosicaoXProps) {
    super(props);
  }

  public static create (posicao: number): Result<EmpacotamentoPosicaoX> {
    const guardResult = Guard.againstNullOrUndefined(posicao, 'posicao');

    if (!guardResult.succeeded) {
      return Result.fail<EmpacotamentoPosicaoX>(guardResult.message);
    } 
    
    else if(posicao<0 || posicao>10) {
      return Result.fail<EmpacotamentoPosicaoX>("Posição X deve estar entre 0  e 10.\n");
    } 
    
    else {
      return Result.ok<EmpacotamentoPosicaoX>(new EmpacotamentoPosicaoX({ value: posicao }))
    }
  }
}