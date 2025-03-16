import { IGenerics } from "./IGenerics";

export interface ITeachers extends Document, IGenerics {
    isModified: any;
    tName: string;
    isAdmin?: boolean;
    qualification: string;
    experience: string;
}