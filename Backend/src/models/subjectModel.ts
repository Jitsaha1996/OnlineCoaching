import mongoose, { Schema, Document, Model } from "mongoose";
import { ISubject } from '../common/ISubject';

const subjectSchemaTS: Schema<ISubject> = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,
    },
    subjectDescription: {
      type: String,
      required: false,
    },

  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model<ISubject>('Subject', subjectSchemaTS);

export default Subject;