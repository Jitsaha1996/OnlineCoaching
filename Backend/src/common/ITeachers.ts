import { IGenerics } from "./IGenerics";

export interface ITeachers extends Document, IGenerics {
    isModified: any;
    tName: string;
    isAdmin?: boolean;
    qualification: string;
    experience: string;
    notes: [
        {
            notesID: string;
            notesName: string;
            subject: string;
            class : string;
            notesDescription: string;
            createdAt: Date;
        }
    ];
}