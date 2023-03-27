/* eslint-disable prettier/prettier */
import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';
import mongoose from 'mongoose';

const CamiaoSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    tara: {
      type: Number,
      //required: [true, 'Introduza a tara do camião'],
      //index: true,
    },

    cargaKg: {
      type: Number,
      //required: [true, 'Introduza a carga em kg do camião'],
      //index: true,
    },

    cargaKWh: {
      type: Number,
      //required: [true, 'Introduza a carga em kwh do camião'],
      //index: true,
    },

    autonomia: {
      type: Number,
      //required: [true, 'Introduza a autonomia do camião'],
      //index: true,
    },

    tempoCarregamentoRapido: {
      type: Number,
      //required: [true, 'Introduza o tempo de carregamento rápido do camião'],
      //index: true,
    },   

    ativado: {
      type: Boolean,
      //required: [true, 'Introduza o tempo de carregamento rápido do camião'],
      //index: true,
    },

    salt: String,

  },
  { timestamps: true },
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);
