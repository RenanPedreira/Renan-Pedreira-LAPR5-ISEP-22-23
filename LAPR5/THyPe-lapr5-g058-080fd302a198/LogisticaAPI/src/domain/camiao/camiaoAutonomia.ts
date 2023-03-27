/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoAutonomiaProps {
  value: number;
}

export class CamiaoAutonomia extends ValueObject<CamiaoAutonomiaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoAutonomiaProps) {
    super(props);
  }

  public static create (autonomia: number): Result<CamiaoAutonomia> {
    const guardResult = Guard.againstNullOrUndefined(autonomia, 'autonomia');

    if (!guardResult.succeeded) {
      return Result.fail<CamiaoAutonomia>(guardResult.message);
    } 
    
    else if(autonomia<=0) {
      return Result.fail<CamiaoAutonomia>("Autonomia não pode ser menor ou igual a zero.\n");
    } 
    
    else {
      return Result.ok<CamiaoAutonomia>(new CamiaoAutonomia({ value: autonomia }))
    }
  }
}