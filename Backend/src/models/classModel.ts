import mongoose, { Schema, Document, Model } from "mongoose";
import { IClass } from '../common/IClass';

const classSchemaTS: Schema<IClass> = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true,
    },
    classDescription: {
      type: String,
      required: false,
    },

  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model<IClass>('Class', classSchemaTS);

export default Class;