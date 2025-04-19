import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { IStudents } from "../common/IStudents";
import { ITeachers } from "../common/ITeachers";
import { IQualification } from "../common/IQualification";
import StudentTS from "../models/studentsModel";
import TeacherTS from "../models/teachersModel";
import Qualification from "../models/qualificationModel";
// Extend the Request interface to include user property
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        [key: string]: any;
    };
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decodes token and verifies it
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
            console.log("Decoded token:", decoded);
           if(decoded.exp && decoded.exp < Date.now() / 1000) { 
                res.status(401);
                throw new Error("Token expired, please log in again");  
           }

           if(decoded.userType === "student"){
                const student = await StudentTS.findById(decoded.id).select("-password") as IStudents;
                if (!student) {
                    res.status(401);
                    throw new Error("Not authorized, user not found");
                }

           }else if(decoded.userType === "teacher"){
                const teacher = await TeacherTS.findById(decoded.id).select("-password") as ITeachers;
                if (!teacher) {
                    res.status(401);
                    throw new Error("Not authorized, user not found");
                }
                
           }
          
            next();
        } catch (error) {
            res.status(401);
            if (error instanceof Error) {
                throw new Error(`${error.message}`);
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export { protect };
