/* eslint-disable prettier/prettier */
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { EmpacotamentoID } from "./empacotamentoID";
import { EmpacotamentoCamiao } from "./empacotamentoCamiao";
import { EmpacotamentoPosicaoX } from "./empacotamentoPosicaoX";
import { EmpacotamentoPosicaoY } from "./empacotamentoPosicaoY";
import { EmpacotamentoPosicaoZ } from "./empacotamentoPosicaoZ";
import { Guard } from "../../core/logic/Guard";

interface EmpacotamentoProps {
    camiao: EmpacotamentoCamiao;
    posicaoX: EmpacotamentoPosicaoX;
    posicaoY: EmpacotamentoPosicaoY;
    posicaoZ : EmpacotamentoPosicaoZ;
  }

  export class Empacotamento extends AggregateRoot<EmpacotamentoProps> {

    //Gets  
    get id (): UniqueEntityID {
        return this._id;
    }
    get empacotamentoID (): EmpacotamentoID {
        return new EmpacotamentoID(this.empacotamentoID.toValue());
    }
    get camiao (): EmpacotamentoCamiao {
        return this.props.camiao;
    }
    get posicaoX (): EmpacotamentoPosicaoX {
        return this.props.posicaoX;
    }
    get posicaoY (): EmpacotamentoPosicaoY {
        return this.props.posicaoY;
    }
    get posicaoZ (): EmpacotamentoPosicaoZ {
        return this.props.posicaoZ;
    }

    //Sets
    updateCamiao (value: EmpacotamentoCamiao) {
        this.props.camiao = value;
    }
    updatePosicaoX (value: EmpacotamentoPosicaoX) {
        this.props.posicaoX = value;
    }
    updatePosicaoY (value: EmpacotamentoPosicaoY) {
        this.props.posicaoY = value;
    }
    updatePosicaoZ (value: EmpacotamentoPosicaoZ) {
        this.props.posicaoZ = value;
    }

    //Constructors
    private constructor (props: EmpacotamentoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: EmpacotamentoProps, id?: UniqueEntityID): Result<Empacotamento> {

        const guardedProps = [
          { argument: props.camiao, argumentName: 'camiao' },
          { argument: props.posicaoX, argumentName: 'posicaoX' },
          { argument: props.posicaoY, argumentName: 'posicaoY' },
          { argument: props.posicaoZ, argumentName: 'posicaoZ' }
        ];
    
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
        if (!guardResult.succeeded) {
          return Result.fail<Empacotamento>(guardResult.message)
        }     
        else {
          const empacotamento = new Empacotamento({
            ...props
          }, id);
    
          return Result.ok<Empacotamento>(empacotamento);
        }
      }

  }