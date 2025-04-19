import { IGenerics } from "./IGenerics";
export interface IStudents extends IGenerics {
    sName: string;
    isArchived: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    parentEmail?: string;
    parentPhone?: string;
    sclass: string;
    token?: string;
}