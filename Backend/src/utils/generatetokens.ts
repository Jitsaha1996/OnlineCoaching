import jwt from "jsonwebtoken";
import { IStudents } from "../common/IStudents";

const jwtToken = (student: IStudents): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      id: student._id,
      email: student.email,
      name: student.sName,
      phone: student.phone,
      dob: student.dob,
      isArchived: student.isArchived,
      userType: student.userType,
      gender: student.gender,
      parentEmail: student.parentEmail,
      parentPhone: student.parentPhone,
      sclass: student.sclass,
      aud: "student-register", // Audience claim
      iss: "Onlinecoaching", // Issuer claim
      sub: student._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30m" } // Token expiration set to 30 minutes
  );
};

export default jwtToken;
