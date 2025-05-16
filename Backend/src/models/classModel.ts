import mongoose, { Schema, Document, Model } from "mongoose";
import { IClass } from '../common/IClass';

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectDescription: {
    type: String,
    required: false,
  },
  subjectCode: {
    type: String,
    required: false,
  }
}, { _id: true }); // Mongo auto-generates _id

const boardSchema = new Schema({
  boardName: {
    type: String,
    required: true,
  },
  boardDescription: {
    type: String,
    required: false,
  },
  subjects: [subjectSchema]
}, { _id: true }); // Mongo auto-generates _id

const classSchemaTS: Schema<IClass> = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true, // global uniqueness for class names is OK
  },
  classDescription: {
    type: String,
    required: false,
  },
  boards: [boardSchema]
}, {
  timestamps: true,
});

const Class = mongoose.model<IClass>('Class', classSchemaTS);

export default Class;
