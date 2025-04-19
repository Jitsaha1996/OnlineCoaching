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

            // Find user by ID from decoded token
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            req.user = {
                id: user._id.toString(),
                ...user.toObject(),
            };

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export { protect };
