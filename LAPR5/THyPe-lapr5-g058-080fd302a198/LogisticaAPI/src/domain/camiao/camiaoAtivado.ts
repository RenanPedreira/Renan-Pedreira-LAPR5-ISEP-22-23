/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoAtivadoProps {
  value: boolean;
}

export class CamiaoAtivado extends ValueObject<CamiaoAtivadoProps> {
  get value (): boolean {
    return this.props.value;
  }
  
  private constructor (props: CamiaoAtivadoProps) {
    super(props);
  }

  public static create (ativado: boolean): Result<CamiaoAtivado> {
    //const guardResult = Guard.againstNullOrUndefined(ativado, 'ativado');

    // if (!guardResult.succeeded) {
    //   return Result.fail<CamiaoAtivado>(guardResult.message);
    // } 
    
    // else {
    //   return Result.ok<CamiaoAtivado>(new CamiaoAtivado({ value: ativado }))
    // }
    return Result.ok<CamiaoAtivado>(new CamiaoAtivado({ value: ativado }))
  }
}