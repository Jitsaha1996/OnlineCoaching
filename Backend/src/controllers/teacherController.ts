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
  const {userType, phone, password } = req.body;
  if (userType?.toLowerCase() !== "teacher") {
    res.status(403);
    throw new Error("Usertype should be teacher");
  }
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
export const getTeachersList = asyncHandler(async (req: any, res: any) => {
  try {
    const teacherList = await Teacher.find().select(
      "tName phone email isAdmin isArchived"
    );

    if (!teacherList.length) {
      return res.status(204).json({ message: "No users found" });
    }

    res.status(200).json(teacherList);
  } catch (error:any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export const editTeachers = asyncHandler(async (req: Request, res: Response) => {
  const { tName, pic, dob, phone, email, isArchived,gender,isAdmin,qualification,experience,isModified  } = req.body;

  const teacherExist = await Teacher.findOne({ phone, email });
  if (!teacherExist) {
    res.status(404);
    throw new Error("User not found");
  }

  const filter = { phone: phone , email: email };
  const updateDocument = {
    $set: {
      tName, 
      pic,
      dob,
      isArchived,
      gender,
      isAdmin,
      qualification,
      experience,
      isModified,
          
    },
  };

  const student = await Teacher.updateOne(filter, updateDocument);

  if (student.modifiedCount > 0) {
    res.status(200).json({
      message: `${tName} updated successfully!`,
      status: "success",
      phone,
      email,
      statusCode: 200,
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});


export const getActiveTeachers = asyncHandler(async (req: any, res: any) => {
  try {
    const activeTeachers = await Teacher.find({ isArchived: false });

    if (!activeTeachers.length) {
      return res.status(204).json({ message: "No active teachers found" });
    }

    const filteredTeachers = activeTeachers.map((teacher) => ({
      TeacherID: teacher._id,
      TeacherName: teacher.tName,
      Teacherphone: teacher.phone,
      Teacheremail: teacher.email,
    }));
    res.status(200).json(filteredTeachers);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
