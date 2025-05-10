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
export const getClass = async (req: any, res: any) => {
    try {
        console.log(req.params);
        const  {className}  = req.params;
        const classInstance = await Class.findOne({ className });
        if (!classInstance) {
             res.status(404).json({ message: "Class not found" });
             return;
        }
        res.status(201).json({
            
            _id: classInstance._id,
            className: classInstance.className,
            classDescription: classInstance.classDescription,
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class', error });
    }
};
// Edit a class by ID
export const editClass = async (req: any, res: any) => {
    const { className, classDescription } = req.body;
    const classExist = await Class.findOne({ className });

    if (!classExist) {
        return res.status(404).json({
            message: `Class ${className} not found`,
            status: "error",
            statusCode: 404,
        });
    }
    const filter = { className: classExist.className };
    const updateDocument = {
        $set: {
            classDescription: classDescription,
        },
    }; 
    const classUpdated = await Class.updateOne(filter, updateDocument);
    if (classUpdated.modifiedCount > 0) {
        return res.status(200).json({
            message: `Class ${className} updated successfully!`,
            status: "success",
            statusCode: 200,
        });
    } else {
        return res.status(400).json({
            message: "Error occurred while updating class",
            status: "error",
            statusCode: 400,
        });
    }
};
// Delete a class by ID
export const deleteClass = async (req: Request, res: Response) => {
    try {
        const { className } = req.params;
        const deletedClass = await Class.findOneAndDelete({className});
        if (!deletedClass) {
            res.status(404).json({ message: "Class not found" });
            return;
        }
        res.status(200).json({ message: "Class deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting class', error });
    }
};