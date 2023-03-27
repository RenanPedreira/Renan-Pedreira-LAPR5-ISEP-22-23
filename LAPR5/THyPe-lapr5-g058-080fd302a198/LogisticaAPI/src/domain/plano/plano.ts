/* eslint-disable prettier/prettier */
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { PlanoID } from "./planoID";
import { PlanoMatricula } from "./planoMatricula";
import { PlanoData } from "./planoData";
import { PlanoArmazem } from "./planoArmazem";
import { PlanoEntrega } from "./planoEntrega";
import { Guard } from "../../core/logic/Guard";


interface PlanoProps {
  matricula: PlanoMatricula;
  date: PlanoData;
  armazem: PlanoArmazem;
  entrega : PlanoEntrega;
}

export class Plano extends AggregateRoot<PlanoProps> {

  //Gets  
  get id (): UniqueEntityID {
    return this._id;
  }
  get planoID (): PlanoID {
    return new PlanoID(this.planoID.toValue());
  }
  get matricula (): PlanoMatricula {
    return this.props.matricula;
  }
  get data (): PlanoData {
    return this.props.date;
  }
  get armazem (): PlanoArmazem {
    return this.props.armazem;
  }
  get entrega (): PlanoEntrega {
    return this.props.entrega;
  }

  //Sets
  updateMatricula (value: PlanoMatricula) {
    if(value != null){
      this.props.matricula = value;
    }
  }
  updateData (value: PlanoData) {
    if(value != null){
      this.props.date = value;
    }
  }
  updateArmazem (value: PlanoArmazem) {
    if(value != null){
      this.props.armazem = value;
    }
  }
  updateEntrega (value: PlanoEntrega) {
    if(value != null){
      this.props.entrega = value;
    }
  }

  //Constructors
  private constructor (props: PlanoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PlanoProps, id?: UniqueEntityID): Result<Plano> {

    const guardedProps = [
      { argument: props.matricula, argumentName: 'matricula' },
      { argument: props.date, argumentName: 'date' },
      { argument: props.armazem, argumentName: 'armazem' },
      { argument: props.entrega, argumentName: 'entrega' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Plano>(guardResult.message)
    }     
    else {
      const plano = new Plano({
        ...props
      }, id);

      return Result.ok<Plano>(plano);
    }
  }
}