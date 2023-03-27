/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoCargaKWhProps {
  value: number;
}

export class CamiaoCargaKWh extends ValueObject<CamiaoCargaKWhProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoCargaKWhProps) {
    super(props);
  }

  public static create (cargaKWh: number): Result<CamiaoCargaKWh> {
    const guardResult = Guard.againstNullOrUndefined(cargaKWh, 'cargaKWh');

    if (!guardResult.succeeded) {
      return Result.fail<CamiaoCargaKWh>(guardResult.message);
    } 
    
    else if(cargaKWh<=0) {
      return Result.fail<CamiaoCargaKWh>("Carga em KWh não pode ser menor ou igual a zero.\n");
    } 
    
    else {
      return Result.ok<CamiaoCargaKWh>(new CamiaoCargaKWh({ value: cargaKWh }))
    }
  }
}