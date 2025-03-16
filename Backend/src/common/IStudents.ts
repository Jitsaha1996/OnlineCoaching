import { IGenerics } from "./IGenerics";
import { Document } from "mongoose";
export interface IStudents extends IGenerics, Document {
    sName: string;
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    parentEmail: string;
    parentPhone: string;
    sclass: string;
}