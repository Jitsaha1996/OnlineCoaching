import mongoose, { Schema, Document, Model } from "mongoose";
import { Iclass } from '../common/IClass';

const classSchemaTS: Schema<Iclass> = new mongoose.Schema(
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

const Class = mongoose.model<Iclass>('Class', classSchemaTS);

export default Class;