/* eslint-disable prettier/prettier */
import { IEmpacotamentoPersistence } from '../../dataschema/IEmpacotamentoPersistence';
import mongoose from 'mongoose';

const EmpacotamentoSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    camiao: {
      type: String,
      //required: [true, 'Introduza a tara do camião'],
      //index: true,
    },

    posicaoX: {
      type: Number,
      //required: [true, 'Introduza a carga em kg do camião'],
      //index: true,
    },

    posicaoY: {
      type: Number,
      //required: [true, 'Introduza a carga em kwh do camião'],
      //index: true,
    },

    posicaoZ: {
      type: Number,
      //required: [true, 'Introduza a autonomia do camião'],
      //index: true,
    },

    salt: String,

  },
  { timestamps: true },
);

export default mongoose.model<IEmpacotamentoPersistence & mongoose.Document>('Empacotamento', EmpacotamentoSchema);
