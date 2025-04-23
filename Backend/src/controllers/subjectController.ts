import { Request, Response } from 'express';
import Subject from '../models/subjectModel';

// Add a new subject
export const addSubject = async (req: Request, res: Response) => {
    try {
        const subjectInstance = new Subject(req.body);
        const savedSubject = await subjectInstance.save();
        res.status(201).json(addSubject);
    } catch (error) {
        res.status(500).json({ message: 'Error adding subject', error });
    }
};

// Get all subject
export const getAllSubject = async (_req: Request, res: Response) => {
    try {
        const subject = await Subject.find();
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject', error });
    }
};
// Get a single subject by name
export const getSubject = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const subjectInstance = await Subject.findOne({ name });
        if (!subjectInstance) {
             res.status(404).json({ message: "subject not found" });
             return;
        }
        res.json({
            
            _id: subjectInstance._id,
            name: subjectInstance.subjectName,
            description: subjectInstance.subjectDescription,
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject', error });
    }
};
// Edit a subject by ID
export const editSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedSubject) {
            res.status(404).json({ message: "Subject not found" });
            return;
        }
        res.status(404).json(updatedSubject);
    } catch (error) {
        res.status(400).json({ message: 'Error updating subject', error });
    }
};
// Delete a Subject by ID
export const deleteSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedSubject = await Subject.findByIdAndDelete(id);
        if (!deletedSubject) {
            res.status(404).json({ message: "Subject not found" });
            return;
        }
        res.status(200).json({ message: "Subject deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting Subject', error });
    }
};