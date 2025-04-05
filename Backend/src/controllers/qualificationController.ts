import { Request, Response } from 'express';
import Qualification from '../models/qualificationModel'; 

// Add a new qualification
export const addQualification = async (req: Request, res: Response) => {
    try {
        const qualification = new Qualification(req.body);
        const savedQualification = await qualification.save();
        res.status(201).json(savedQualification);
    } catch (error) {
        res.status(500).json({ message: 'Error adding qualification', error });
    }
};


// Get all qualifications
export const getAllQualification = async (_req: Request, res: Response) => {
    try {
        const qualifications = await Qualification.find();
        res.status(200).json(qualifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching qualifications', error });
    }
};
// Get a single qualification by name
export const getQualification = async (req: Request, res: Response) => {
    try {
        const { name } = new Qualification(req.body);
        const qualification = await Qualification.findOne({ name });
        if (!qualification) {
             res.status(404).json({ message: "Qualification not found" });
             return;
        }
        res.json({
            _id: qualification._id,
            name: qualification.name,
            description: qualification.description,
            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching qualification', error });
    }
};
