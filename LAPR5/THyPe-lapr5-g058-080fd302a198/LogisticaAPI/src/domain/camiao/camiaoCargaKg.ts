/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoCargaKgProps {
  value: number;
}

export class CamiaoCargaKg extends ValueObject<CamiaoCargaKgProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CamiaoCargaKgProps) {
    super(props);
  }

  public static create (cargaKg: number): Result<CamiaoCargaKg> {
    const guardResult = Guard.againstNullOrUndefined(cargaKg, 'cargaKg');

    if (!guardResult.succeeded) {
      return Result.fail<CamiaoCargaKg>(guardResult.message);
    }
    
    else if(cargaKg<=0) {
      return Result.fail<CamiaoCargaKg>("Carga em Kg não pode ser menor ou igual a zero.\n");
    } 

    else {
      return Result.ok<CamiaoCargaKg>(new CamiaoCargaKg({ value: cargaKg }))
    }
  }
}