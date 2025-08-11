import { Request, Response } from 'express';
import Class from '../models/classModel';  
import { IClass } from '../common/IClass';

// Add a new class
export const addClass = async (req: any, res: any) => {
    try {
        const classAddedFromUser :IClass= req.body;
        const className= classAddedFromUser.className;
        console.log("className",className);

        const classExist = await Class.findOne({className});
        if (classExist) {
            return res.status(400).json({
                message: `Class ${className} already exists`,
                status: "error",
                statusCode: 400,
            });
        }
        const classInstance = new Class(classAddedFromUser);
        const savedClass = await classInstance.save();
        res.status(201).json(savedClass);
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
            boards: classInstance.boards,
            

            
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class', error });
    }
};
// Edit a class by ID
export const editClass = async (req: any, res: any) => {
    try {
        const classId = req.params.id;
        const updatedClassData: IClass = req.body;

        const classToUpdate = await Class.findById(classId);
        if (!classToUpdate) {
            return res.status(404).json({
                message: `Class with ID ${classId} not found`,
                status: "error",
                statusCode: 404,
            });
        }

        if (updatedClassData.className !== classToUpdate.className) {
            const existingClass = await Class.findOne({ className: updatedClassData.className });
            if (existingClass) {
                return res.status(400).json({
                    message: `Class ${updatedClassData.className} already exists`,
                    status: "error",
                    statusCode: 400,
                });
            }
        }

        const updatedClass = await Class.findByIdAndUpdate(classId, updatedClassData, { new: true });

        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: 'Error updating class', error });
    }
};

// Edit only boards by className
export const editClassBoards = async (req: any, res: any) => {
    try {
        const { className } = req.params;
        const { boards } = req.body;

        if (!boards) {
            return res.status(400).json({ message: "Boards data is required" });
        }

        const updatedClass = await Class.findOneAndUpdate(
            { className },
            { boards },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: `Class with name ${className} not found` });
        }

        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: 'Error updating boards', error });
    }
};

export const editClassSubject = async (req: any, res: any) => {
  try {
    const { classId, boardName } = req.params;
    console.log("className", classId);
    console.log("boardName", boardName);
    const { subject } = req.body;

    if (!subject || !Array.isArray(subject)) {
      return res.status(400).json({ message: "Subjects data is required and must be an array." });
    }

    const classDoc = await Class.findOne({ classId });

    console.log("classDoc", classDoc);

    if (!classDoc) {
      return res.status(404).json({ message: `Class with name '${classId}' not found.` });
    }

    const board = classDoc.boards.find((b) => b.boardName === boardName);

    console.log("board", board);

    if (!board) {
      return res.status(404).json({ message: `Board '${boardName}' not found in class '${classId}'.` });
    }
    const existingSubjects = board.subjects.map((s) => s.subjectName);
    const newSubjects = subject.filter((s) => !existingSubjects.includes(s.subjectName));
    const updatedSubjects = [...board.subjects, ...newSubjects];
    board.subjects = updatedSubjects;
    

    await classDoc.save();

    res.status(200).json(classDoc);
  } catch (error) {
    console.error("Error updating subjects:", error);
    res.status(500).json({ message: "Error updating subjects", error });
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
// Delete a board by className and boardName
export const deleteBoard = async (req: any, res: any) => {
    try {
        const { className, boardName } = req.params;
        const classToUpdate = await Class.findOne({ className });
        if (!classToUpdate) {
            return res.status(404).json({ message: `${className} not found` });
        }

        classToUpdate.boards = classToUpdate.boards.filter(board => board.boardName !== boardName);
        await classToUpdate.save();

        res.status(200).json({ message: `Board ${boardName} deleted from class ${className}` });
    } catch (error) {       
        res.status(500).json({ message: 'Error deleting board', error });
    }       

};

 
