import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwtToken from "../utils/generatetokens"; // Ensure this utility is written in TypeScript
import Teacher  from "../models/teachersModel"; // Adjust import path as needed

// Register a new user
export const registerTeachers = asyncHandler(async (req: Request, res: Response) => {
  const { tName, email, password, pic, dob, phone, isArchived } = req.body;

  // Check if user already exists
  const userExist = await Teacher.findOne({ email });
  if (userExist) {
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
  });

  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      rName: teacher.tName,
      pic: teacher.pic,
      email: teacher.email,
      isAdmin: teacher.isAdmin,
      phone: teacher.phone,
      dob: teacher.dob,
      isArchived: teacher.isArchived,
    //   token: jwtToken(teacher._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

// Edit user details
export const editTeachers = asyncHandler(async (req: Request, res: Response) => {
  const { tName, pic, dob, phone, email, isArchived } = req.body;

  const teacherExist = await Teacher.findOne({ email });
  if (!teacherExist) {
    res.status(404);
    throw new Error("User not found");
  }

  const filter = { email: email };
  const updateDocument = {
    $set: {
      tName,
      pic,
      dob,
      phone,
      isArchived,
    },
  };

  const teacher = await Teacher.updateOne(filter, updateDocument);

  if (teacher.modifiedCount > 0) {
    res.status(200).json({
      message: `${email} updated successfully!`,
      status: "success",
      email,
      statusCode: 200,
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

// Forget password
export const forgetPasswords = asyncHandler(async (req: Request, res: Response) => {
  const { phone, newPassword } = req.body;

  const teacherExist = await Teacher.findOne({ phone });
  if (!teacherExist) {
    res.status(404);
    throw new Error("User not found");
  }

  teacherExist.password = newPassword; // Update password directly
  await teacherExist.save();

  res.status(200).json({
    message: `${phone} updated successfully!`,
    status: "success",
    statusCode: 200,
  });
});

// Authenticate user
export const authTeachers = asyncHandler(async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  const teacher = await Teacher.findOne({ phone });
  if (teacher && (await teacher.matchPassword(password))) {
    res.json({
      _id: teacher._id,
      sName: teacher.tName,
      email: teacher.email,
      isAdmin: teacher.isAdmin,
      isArchived: teacher.isArchived,
      pic: teacher.pic,
    //   token: jwtToken(teacher._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Phone and Password");
  }
});

// Get all users
export const getTeachersList = asyncHandler(async (req: any, res: any) => {
  try {
    const teacherList = await Teacher.find().select(
      "sName phone email isAdmin isArchived"
    );

    if (!teacherList.length) {
      return res.status(204).json({ message: "No users found" });
    }

    res.status(200).json(teacherList);
  } catch (error:any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user by email
export const getTeachersByEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params;

  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    _id: teacher._id,
    rName: teacher.tName,
    email: teacher.email,
    isAdmin: teacher.isAdmin,
    isArchived: teacher.isArchived,
    pic: teacher.pic,
    dob: teacher.dob,
    phone: teacher.phone,
  });
});
