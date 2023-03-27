/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PlanoDataProps {
  value: number;
}

export class PlanoData extends ValueObject<PlanoDataProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: PlanoDataProps) {
    super(props);
  }

  public static create (date: number): Result<PlanoData> {
    // const guardResult = Guard.againstNullOrUndefined(date, 'date');
    // if (!guardResult.succeeded) {
    //   return Result.fail<PlanoData>(guardResult.message);
    // }
    
    if(date<todayDate()) {
      return Result.fail<PlanoData>("Data inválida.\n");
    } 
    
    else {
      return Result.ok<PlanoData>(new PlanoData({ value: date }))
    }
  }
  
}

function todayDate(): number {
    var today = new Date();
    var day = 0;

    day += today.getFullYear() * 10000;
    day += today.getMonth() * 100;
    day += today.getDay();

    return day;
}
