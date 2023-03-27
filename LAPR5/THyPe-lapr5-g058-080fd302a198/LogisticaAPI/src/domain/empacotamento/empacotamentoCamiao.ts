/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EmpacotamentoProps {
  value: string;
}

export class EmpacotamentoCamiao extends ValueObject<EmpacotamentoProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: EmpacotamentoProps) {
    super(props);
  }

  public static create (camiao: string): Result<EmpacotamentoCamiao> {
    const guardResult = Guard.againstNullOrUndefined(camiao, 'camiao');

    if (!guardResult.succeeded) {
      return Result.fail<EmpacotamentoCamiao>(guardResult.message);
    } 
    
    else if(camiao.length!=8) {
      return Result.fail<EmpacotamentoCamiao>("Deve seguir o modelo de matrícula portuguesa.\n");
    } 
    
    else {
      return Result.ok<EmpacotamentoCamiao>(new EmpacotamentoCamiao({ value: camiao }))
    }
  }
}