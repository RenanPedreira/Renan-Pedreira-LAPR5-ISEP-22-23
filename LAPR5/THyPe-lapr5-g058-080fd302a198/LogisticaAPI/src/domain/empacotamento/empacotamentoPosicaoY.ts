/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EmpacotamentoPosicaoYProps {
  value: number;
}

export class EmpacotamentoPosicaoY extends ValueObject<EmpacotamentoPosicaoYProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EmpacotamentoPosicaoYProps) {
    super(props);
  }

  public static create (posicao: number): Result<EmpacotamentoPosicaoY> {
    const guardResult = Guard.againstNullOrUndefined(posicao, 'posicao');

    if (!guardResult.succeeded) {
      return Result.fail<EmpacotamentoPosicaoY>(guardResult.message);
    } 
    
    else if(posicao<0 || posicao>20) {
      return Result.fail<EmpacotamentoPosicaoY>("Posição Y deve estar entre 0  e 20.\n");
    } 
    
    else {
      return Result.ok<EmpacotamentoPosicaoY>(new EmpacotamentoPosicaoY({ value: posicao }))
    }
  }
}