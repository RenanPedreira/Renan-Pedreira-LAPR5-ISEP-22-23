/* eslint-disable prettier/prettier */
import { IRotaPersistence } from '../../dataschema/IRotaPersistence';
import mongoose from 'mongoose';

const RotaSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    //rotaId: { type: Number, required: true, unique: true },
    
    distancia: { 
      type: Number, 
      //required: true, 
      //unique: false 
    },
    
    armazemOrigem: { 
      type: Number, 
      //required: true, 
      //unique: false 
    },

    armazemDestino: { 
      type: Number, 
      //required: true, 
      //unique: false 
    },

    tempoPercorrer: {
       type: Number, 
       //required: true, 
       //unique: false 
    },

    tempoCarregamento: { 
      type: Number,
      //required: true, 
      //unique: false 
    },

    tempoCarregamentoExtra: { 
      type: Number, 
      //required: true, 
      //unique: false 
    },

  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRotaPersistence & mongoose.Document>('Rota', RotaSchema);