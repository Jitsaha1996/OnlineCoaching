import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { jwtTokenStudent } from "../utils/generatetokens"; // Ensure this utility is written in TypeScript
import Student from "../models/studentsModel"; // Adjust import path as needed

// Register a new user
export const registerStudents = asyncHandler(async (req: Request, res: Response) => {

  const { sName, email, password, pic, dob, phone, isArchived, userType, gender, parentEmail, parentPhone, sclass } = req.body;

  // Check if user already exists
  const studentExist = await Student.findOne({ email });
  if (studentExist) {
    res.status(400);
    throw new Error("Student Already Exist");
  }

  // Optionally check image size
  if (Buffer.byteLength(pic, "base64") > 1 * 1024 * 1024) {
    res.status(400);
    throw new Error("Image size exceeds limit of 1MB");
  }

  // Create a new user
  const student = await Student.create({
    sName,
    email,
    password,
    pic,
    dob,
    phone,
    isArchived,
    userType,
    gender,
    parentEmail,
    parentPhone,
    sclass
  });

  if (student) {
    res.status(201).json({
      _id: student._id,
      rName: student.sName,
      pic: student.pic,
      email: student.email,
      //   isAdmin: student.isAdmin,
      phone: student.phone,
      dob: student.dob,
      isArchived: student.isArchived,
      userType: student.userType,
      gender: student.gender,
      token: jwtTokenStudent("student", student),
      parentEmail: student.parentEmail,
      parentPhone: student.parentPhone,
      sclass: student.sclass
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

// Edit user details
// export const editStudents = asyncHandler(async (req: Request, res: Response) => {
//   const { sName, pic, dob, phone, email, isArchived } = req.body;

//   const studentExist = await Student.findOne({ email });
//   if (!studentExist) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   const filter = { email: email };
//   const updateDocument = {
//     $set: {
//       sName,
//       pic,
//       dob,
//       phone,
//       isArchived,
//     },
//   };

//   const student = await Student.updateOne(filter, updateDocument);

//   if (student.modifiedCount > 0) {
//     res.status(200).json({
//       message: `${email} updated successfully!`,
//       status: "success",
//       email,
//       statusCode: 200,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Error Occurred");
//   }
// });

// // Forget password
export const forgetPasswords = asyncHandler(async (req: Request, res: Response) => {
  const { phone, newPassword } = req.body;

  const studentExist = await Student.findOne({ phone });
  if (!studentExist) {
    res.status(404);
    throw new Error("student not found");
  }

  studentExist.password = newPassword; // Update password directly
  await studentExist.save();

  res.status(200).json({
    message: `${phone} updated successfully!`,
    status: "success",
    statusCode: 200,
  });
});

// // Authenticate user
export const authStudents = asyncHandler(async (req: Request, res: Response) => {
  const { userType,phone, password } = req.body;
  if (userType?.toLowerCase() !== "student") {
    res.status(403);
    throw new Error("Usertype should be student");
  }
  const student = await Student.findOne({ phone });
  if (student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      sName: student.sName,
      email: student.email,
    //   isAdmin: student.isAdmin,
      isArchived: student.isArchived,
      password: student.password,
      // pic: student.pic,
      userType:student.userType,
      phone: student.phone,
      token: jwtTokenStudent("student", student._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Phone and Password");
  }
});
export const getStudentsList = asyncHandler(async (req: any, res: any) => {
  try {
    const studentList = await Student.find().select(
      "sName phone email isAdmin isArchived"
    );

    if (!studentList.length) {
      return res.status(204).json({ message: "No users found" });
    }

    res.status(200).json(studentList);
  } catch (error:any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// // Get all users
// export const getStudentsList = asyncHandler(async (req: any, res: any) => {
//   try {
//     const studentList = await Student.find().select(
//       "sName phone email isAdmin isArchived"
//     );

//     if (!studentList.length) {
//       return res.status(204).json({ message: "No users found" });
//     }

//     res.status(200).json(studentList);
//   } catch (error:any) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get user by email
// export const getStudentsByEmail = asyncHandler(async (req: Request, res: Response) => {
//   const { email } = req.params;

//   const student = await Student.findOne({ email });
//   if (!student) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   res.json({
//     _id: student._id,
//     rName: student.sName,
//     email: student.email,
//     // isAdmin: student.isAdmin,
//     isArchived: student.isArchived,
//     pic: student.pic,
//     dob: student.dob,
//     phone: student.phone,
//   });
// });
