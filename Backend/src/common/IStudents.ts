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
    examDetails: [
        {   examName: string;
            examDate: Date;
            marksObtained: string;
            totalMarks: string;
            subject: string;
            remarks: string;
        }
    ];
    teacherDetails: [
        {   teacherName: string;
            teacherId: string;
            teacherEmail: string;
            teacherPhone: string;
            subject: string;
        }
    ];
    notes: [
        {   notesID: string;
            noteName: string;
            noteDescription: string;
            noteDate: Date;
        }
   
    ];
    paymentDetails: [
        {   paymentID: string;
            paymentDate: Date;
            amount: string;
            status: string;
        }
    ];
}