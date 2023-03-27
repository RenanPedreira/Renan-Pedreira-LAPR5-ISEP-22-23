/* eslint-disable prettier/prettier */
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { RotaId } from "./rotaID";
import { RotaDistancia } from "./rotaDistancia";
import { RotaArmazem } from "./rotaArmazem";
import { RotaTempoPercorrer } from "./rotaTempoPercorrer";
import { RotaTempoCarregamento } from "./rotaTempoCarregamento";
import { RotaTempoCarregamentoExtra } from "./rotaTempoCarregamentoExtra";

import { Guard } from "../../core/logic/Guard";


interface RotaProps {
  distancia: RotaDistancia;
  armazemOrigem: RotaArmazem;
  armazemDestino: RotaArmazem;
  tempoPercorrer: RotaTempoPercorrer;
  tempoCarregamento: RotaTempoCarregamento;
  tempoCarregamentoExtra : RotaTempoCarregamentoExtra;
}

export class Rota extends AggregateRoot<RotaProps> {
  //Gets  
  get id (): UniqueEntityID {
    return this._id;
  }

  get rotaID (): RotaId {
    return new RotaId(this.rotaID.toValue());
  }

  get rotaDistancia (): RotaDistancia {
    return this.props.distancia;
  }

  get rotaArmazemOrigem (): RotaArmazem {
    return this.props.armazemOrigem;
  }

  get rotaArmazemDestino (): RotaArmazem {
    return this.props.armazemDestino;
  }

  get rotaTempoPercorrer (): RotaTempoPercorrer {
    return this.props.tempoPercorrer;
  }

  get rotaTempoCarregamento (): RotaTempoCarregamento {
    return this.props.tempoCarregamento;
  }

  get rotaTempoCarregamentoExtra (): RotaTempoCarregamentoExtra {
    return this.props.tempoCarregamentoExtra;
  }

  //update
  updateArmazemOrigem(value: RotaArmazem){
    this.props.armazemOrigem = value;
  }

  updateArmazemDestino(value: RotaArmazem){
    this.props.armazemDestino = value;
  }

  updateDistancia(value: RotaDistancia) {
    this.props.distancia = value;
  }

  updateTempoPercorrer(value: RotaTempoPercorrer) {
    this.props.tempoPercorrer = value;
  }

  updateTempoCarregamento(value: RotaTempoCarregamento) {
    this.props.tempoCarregamento = value;
  }

  updateTempoCarregamentoExtra(value: RotaTempoCarregamentoExtra) {
    this.props.tempoCarregamentoExtra = value;
  }

  //Constructors
  private constructor (props: RotaProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: RotaProps, id?: UniqueEntityID): Result<Rota> {

    const guardedProps = [
      { argument: props.distancia, argumentName: 'distancia' },
      { argument: props.armazemOrigem, argumentName: 'armazemOrigem' },
      { argument: props.armazemDestino, argumentName: 'armazemDestino' },
      { argument: props.tempoPercorrer, argumentName: 'tempoPercorrer' },
      { argument: props.tempoCarregamento, argumentName: 'tempoCarregamento' },
      { argument: props.tempoCarregamentoExtra, argumentName: 'tempoCarregamentoExtra' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    //O armazém de destino deve ser diferente do armazém de origem
    if(props.armazemOrigem.value == props.armazemDestino.value){
      return Result.fail<Rota>("Rota não pode ter o mesmo armazém como origem e destino");
    }

    if (!guardResult.succeeded) {
      return Result.fail<Rota>(guardResult.message)
    }else {
      const rota = new Rota({
        ...props
      }, id);

      return Result.ok<Rota>(rota);
    }
  }
}