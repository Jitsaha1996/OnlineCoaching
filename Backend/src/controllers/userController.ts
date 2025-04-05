import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
// import { jwtToken } from "../utils/generatetokens"; // Ensure this utility is written in TypeScript
import User, { IUser } from "../models/userModel"; // Adjust import path as needed

// Register a new user
export const registerUsers = asyncHandler(async (req: Request, res: Response) => {
  const { rName, email, password, pic, dob, phone, isArchived } = req.body;

  // Check if user already exists
  const userExist = await User.findOne({ email });
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
  const user = await User.create({
    rName,
    email,
    password,
    pic,
    dob,
    phone,
    isArchived,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      rName: user.rName,
      pic: user.pic,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      dob: user.dob,
      isArchived: user.isArchived,
      // token: jwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

// Edit user details
export const editUsers = asyncHandler(async (req: Request, res: Response) => {
  const { rName, pic, dob, phone, email, isArchived } = req.body;

  const userExist = await User.findOne({ email });
  if (!userExist) {
    res.status(404);
    throw new Error("User not found");
  }

  const filter = { email: userExist.email };
  const updateDocument = {
    $set: {
      rName,
      pic,
      dob,
      phone,
      isArchived,
    },
  };

  const user = await User.updateOne(filter, updateDocument);

  if (user.modifiedCount > 0) {
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

  const userExist = await User.findOne({ phone });
  if (!userExist) {
    res.status(404);
    throw new Error("User not found");
  }

  userExist.password = newPassword; // Update password directly
  await userExist.save();

  res.status(200).json({
    message: `${phone} updated successfully!`,
    status: "success",
    statusCode: 200,
  });
});

// Authenticate user
export const authUsers = asyncHandler(async (req: Request, res: Response) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      rName: user.rName,
      email: user.email,
      isAdmin: user.isAdmin,
      isArchived: user.isArchived,
      pic: user.pic,
      // token: jwtToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Phone and Password");
  }
});

// Get all users
export const getUserList = asyncHandler(async (req: any, res: any) => {
  try {
    const userList = await User.find().select(
      "rName phone email isAdmin isArchived"
    );

    if (!userList.length) {
      return res.status(204).json({ message: "No users found" });
    }

    res.status(200).json(userList);
  } catch (error:any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user by email
export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({
    _id: user._id,
    rName: user.rName,
    email: user.email,
    isAdmin: user.isAdmin,
    isArchived: user.isArchived,
    pic: user.pic,
    dob: user.dob,
    phone: user.phone,
  });
});
