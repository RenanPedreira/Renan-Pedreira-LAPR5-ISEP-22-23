/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EmpacotamentoPosicaoZProps {
  value: number;
}

export class EmpacotamentoPosicaoZ extends ValueObject<EmpacotamentoPosicaoZProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EmpacotamentoPosicaoZProps) {
    super(props);
  }

  public static create (posicao: number): Result<EmpacotamentoPosicaoZ> {
    const guardResult = Guard.againstNullOrUndefined(posicao, 'posicao');

    if (!guardResult.succeeded) {
      return Result.fail<EmpacotamentoPosicaoZ>(guardResult.message);
    } 
    
    else if(posicao<0 || posicao>8) {
      return Result.fail<EmpacotamentoPosicaoZ>("Posição Z deve estar entre 0  e 8.\n");
    } 
    
    else {
      return Result.ok<EmpacotamentoPosicaoZ>(new EmpacotamentoPosicaoZ({ value: posicao }))
    }
  }
}