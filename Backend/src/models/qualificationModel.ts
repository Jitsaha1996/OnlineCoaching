import mongoose, { Schema, Document, Model } from "mongoose";
import { IQualification } from '../common/IQualification';

const qualificationSchemaTS: Schema<IQualification> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },

  },
  {
    timestamps: true,
  }
);

const Qualification = mongoose.model<IQualification>('Qualification', qualificationSchemaTS);

export default Qualification;