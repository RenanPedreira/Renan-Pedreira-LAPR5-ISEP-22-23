/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanoMatriculaProps {
  value: string;
}

export class PlanoMatricula extends ValueObject<PlanoMatriculaProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: PlanoMatriculaProps) {
    super(props);
  }

  public static create (matricula: string): Result<PlanoMatricula> {
    const guardResult = Guard.againstNullOrUndefined(matricula, 'matricula');

    if (!guardResult.succeeded) {
      return Result.fail<PlanoMatricula>(guardResult.message);
    } 
    
    else if(matricula.length!=8) {
      return Result.fail<PlanoMatricula>("Matrícula deve serguir modelo português.\n");
    } 
    
    else {
      return Result.ok<PlanoMatricula>(new PlanoMatricula({ value: matricula }))
    }
  }
}