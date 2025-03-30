import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { jwtTokenTeacher } from "../utils/generatetokens"; // Ensure this utility is written in TypeScript
import Teacher  from "../models/teachersModel"; // Adjust import path as needed

// Register a new user
export const registerTeachers = asyncHandler(async (req: Request, res: Response) => {
  const { tName, email, password, pic, dob, phone, isArchived,userType,qualification,experience,isModified } = req.body;

  // Check if user already exists
  const teacherExist = await Teacher.findOne({ email });
  if (teacherExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  // Optionally check image size
  if (Buffer.byteLength(pic, "base64") > 1 * 1024 * 1024) {
    res.status(400);
    throw new Error("Image size exceeds limit of 1MB");
  }

  // Create a new user
  const teacher = await Teacher.create({
    tName,
    email,
    password,
    pic,
    dob,
    phone,
    isArchived,
    userType,
    qualification,
    experience,
    isModified
  });

  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      tName: teacher.tName,
      pic: teacher.pic,
      email: teacher.email,
      isAdmin: teacher.isAdmin,
      phone: teacher.phone,
      dob: teacher.dob,
      userType: teacher.userType,
      isArchived: teacher.isArchived,
      qualification: teacher.qualification,
      
      experience: teacher.experience,
      isModified: teacher.isModified,
      token: jwtTokenTeacher("teacher",teacher),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

export const authTeachers = asyncHandler(async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  const teacher = await Teacher.findOne({ phone });
  if (teacher && (await teacher.matchPassword(password))) {
    res.json({
      _id: teacher._id,
      sName: teacher.tName,
      email: teacher.email,
      isAdmin: teacher.isAdmin,
    userType:teacher.userType,
      isArchived: teacher.isArchived,
      password: teacher.password,
      pic: teacher.pic,
      phone: teacher.phone,
      token: jwtTokenTeacher("teacher", teacher._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Phone and Password");
  }
});


export const forgetPasswords = asyncHandler(async (req: Request, res: Response) => {
  const { phone, newPassword } = req.body;

  const teacherExist = await Teacher.findOne({ phone });
  if (!teacherExist) {
    res.status(404);
    throw new Error("teacher not found");
  }

  teacherExist.password = newPassword; // Update password directly
  await teacherExist.save();

  res.status(200).json({
    message: `${phone} updated successfully!`,
    status: "success",
    statusCode: 200,
  });
});