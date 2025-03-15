import { IGenerics } from "./IGenerics";

export interface ITeachers extends Document, IGenerics {
    tName: string;
    isAdmin?: boolean;
    qualification: string;
    experience: string;
}