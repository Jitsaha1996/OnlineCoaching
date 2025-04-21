import { Request, Response } from 'express';
import Class from '../models/classModel';  

// Add a new class
export const addClass = async (req: Request, res: Response) => {
    try {
        const classInstance = new Class(req.body);
        const savedClass = await classInstance.save();
        res.status(201).json(addClass);
    } catch (error) {
        res.status(500).json({ message: 'Error adding class', error });
    }
};


// Get all class
export const getAllClass = async (_req: Request, res: Response) => {
    try {
        const classs = await Class.find();
        res.status(200).json(classs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class', error });
    }
};
// Get a single class by name
export const getClass = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const classInstance = await Class.findOne({ name });
        if (!classInstance) {
             res.status(404).json({ message: "Class not found" });
             return;
        }
        res.json({
            
            _id: classInstance._id,
            name: classInstance.className,
            description: classInstance.classDescription,
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class', error });
    }
};
// Edit a class by ID
export const editClass = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedClass) {
            res.status(404).json({ message: "Class not found" });
            return;
        }
        res.status(404).json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: 'Error updating class', error });
    }
};