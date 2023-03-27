/* eslint-disable prettier/prettier */
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { CamiaoID } from "./camiaoID";
import { CamiaoTara } from "./camiaoTara";
import { CamiaoCargaKg } from "./camiaoCargaKg";
import { CamiaoCargaKWh } from "./camiaoCargaKWh";
import { CamiaoAutonomia } from "./camiaoAutonomia";
import { CamiaoTempoCarregamentoRapido } from "./camiaoTempoCarregamentoRapido";
import { CamiaoAtivado } from "./camiaoAtivado";
import { Guard } from "../../core/logic/Guard";


interface CamiaoProps {
  tara: CamiaoTara;
  cargaKg: CamiaoCargaKg;
  cargaKWh: CamiaoCargaKWh;
  autonomia : CamiaoAutonomia;
  tempoCarregamentoRapido : CamiaoTempoCarregamentoRapido;
  ativado: CamiaoAtivado;
}

export class Camiao extends AggregateRoot<CamiaoProps> {

  //Gets  
  get id (): UniqueEntityID {
    return this._id;
  }
  get camiaoID (): CamiaoID {
    return new CamiaoID(this.camiaoID.toValue());
  }
  get tara (): CamiaoTara {
    return this.props.tara;
  }
  get cargaKg (): CamiaoCargaKg {
    return this.props.cargaKg;
  }
  get cargaKWh (): CamiaoCargaKWh {
    return this.props.cargaKWh;
  }
  get autonomia (): CamiaoAutonomia {
    return this.props.autonomia;
  }
  get tempoCarregamentoRapido (): CamiaoTempoCarregamentoRapido {
    return this.props.tempoCarregamentoRapido;
  }
  get ativado (): CamiaoAtivado {
    return this.props.ativado;
  }

  //Sets
  updateTara (value: CamiaoTara) {
    if(value != null){
      this.props.tara = value;
    }
  }
  updateCargaKg (value: CamiaoCargaKg) {
    if(value != null){
      this.props.cargaKg = value;
    }
  }
  updateCargaKWh (value: CamiaoCargaKWh) {
    if(value != null){
      this.props.cargaKWh = value;
    }
  }
  updateAutonomia (value: CamiaoAutonomia) {
    if(value != null){
      this.props.autonomia = value;
    }
  }
  updateInibicao (value: CamiaoAtivado) {
    if(value != null){
      this.props.ativado = value;
    }
  }
  updateTempoCarregamentoRapido (value: CamiaoTempoCarregamentoRapido) {
    if(value != null){
      this.props.tempoCarregamentoRapido = value;
    }
  }

  //Constructors
  private constructor (props: CamiaoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CamiaoProps, id?: UniqueEntityID): Result<Camiao> {

    const guardedProps = [
      { argument: props.tara, argumentName: 'tara' },
      { argument: props.cargaKg, argumentName: 'cargaKg' },
      { argument: props.cargaKWh, argumentName: 'cargaKWh' },
      { argument: props.autonomia, argumentName: 'autonomia' },
      { argument: props.tempoCarregamentoRapido, argumentName: 'tempoCarregamentoRapido' },
      { argument: props.ativado, argumentName: 'ativado' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Camiao>(guardResult.message)
    }     
    else {
      const camiao = new Camiao({
        ...props
      }, id);

      return Result.ok<Camiao>(camiao);
    }
  }
}