/* eslint-disable prettier/prettier */
import { IPlanoPersistence } from '../../dataschema/IPlanoPersistence';
import mongoose from 'mongoose';

const PlanoSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String,
      unique: true
    },

    matricula: {
      type: String,
      //required: [true, 'Introduza a tara do camião'],
      //index: true,
    },

    date: {
      type: Number,
      //required: [true, 'Introduza a carga em kg do camião'],
      //index: true,
    },

    armazens: [String],

    entregas: [[String]]

  },
  { timestamps: true },
);

export default mongoose.model<IPlanoPersistence & mongoose.Document>('Plano', PlanoSchema);
