import { Request, Response } from 'express';
import Subject from '../models/subjectModel';

// Add a new subject
export const addSubject = async (req: any, res: any) => {
    try {
        const subjectInstance = new Subject(req.body);
        const savedSubject = await subjectInstance.save();
        res.status(201).json(savedSubject);
    } catch (error) {
        res.status(500).json({ message: 'Error adding subject', error });
    }
};

// Get all subject
export const getAllSubject = async (_req: any, res: any) => {
    try {
        const subject = await Subject.find();
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject', error });
    }
};
// Get a single subject by name
export const getSubject = async (req: any, res: any) => {
    try {
        console.log(req.params);

        const { subjectName } = req.params;
        const subjectInstance = await Subject.findOne({ subjectName });
        console.log(subjectInstance);
        if (!subjectInstance) {
             res.status(404).json({ message: "subject not found" });
             return;
        }
        res.status(201).json({
            
            _id: subjectInstance._id,
            subjectName: subjectInstance.subjectName,
            description: subjectInstance.subjectDescription,
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject', error });
    }
};
// Edit a subject by ID
export const editSubject = async (req: any, res: any) => {
    const {subjectName,subjectDescription  } = req.body;
    const subjectExist = await Subject.findOne({ subjectName });

    if (!subjectExist) {
        return res.status(404).json({
            message: `subject ${subjectName} not found`,
            status: "error",
            statusCode: 404,
        });
    }
    const filter = { subjectName: subjectExist.subjectName };
    const updateDocument = {
        $set: {
            subjectDescription: subjectDescription,
        },
    }; 
    const subjectsUpdated = await Subject.updateOne(filter, updateDocument);
    if (subjectsUpdated.modifiedCount > 0) {
        return res.status(200).json({
            message: `subject ${subjectName} updated successfully!`,
            status: "success",
            statusCode: 200,
        });
    } else {
        return res.status(400).json({
            message: "Error occurred while updating subject",
            status: "error",
            statusCode: 400,
        });
    }
};
// Delete a Subject by ID
export const deleteSubject = async (req: Request, res: Response) => {
    try {
        const { subjectName } = req.params;
        const deletedSubject = await Subject.findOneAndDelete({subjectName});
        if (!deletedSubject) {
            res.status(404).json({ message: "Subject not found" });
            return;
        }
        res.status(200).json({ message: "Subject deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting Subject', error });
    }
};