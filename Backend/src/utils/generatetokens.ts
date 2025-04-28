import jwt from "jsonwebtoken";
import { IStudents } from "../common/IStudents";
import { ITeachers } from "../common/ITeachers";
import { IGenerics } from "../common/IGenerics";
const jwtTokenStudent = (tokenType:any,  student: any): any => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
if (tokenType === "student") {
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
    { expiresIn: "120m" } // Token expiration set to 120 minutes
  );
}
}


const jwtTokenTeacher= (tokenType:any,  teacher: any): any => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
        {
          id: teacher._id,
          email: teacher.email,
          name: teacher.sName,
          phone: teacher.phone,
          dob: teacher.dob,
          isArchived: teacher.isArchived,
          userType: teacher.userType,
          gender: teacher.gender,
          parentEmail: teacher.parentEmail,
          parentPhone: teacher.parentPhone,
          sclass: teacher.sclass,
          aud: "student-register", // Audience claim
          iss: "Onlinecoaching", // Issuer claim
          sub: teacher._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30m" } // Token expiration set to 30 minutes
      );
}

export { jwtTokenStudent, jwtTokenTeacher };



// else{
//   return jwt.sign(
//     {
//       id: teacher._id,
//       email: teacher.email,
//       name: teacher.sName,
//       phone: teacher.phone,
//       dob: teacher.dob,
//       isArchived: teacher.isArchived,
//       userType: teacher.userType,
//       gender: teacher.gender,
//       parentEmail: teacher.parentEmail,
//       parentPhone: teacher.parentPhone,
//       sclass: teacher.sclass,
//       aud: "student-register", // Audience claim
//       iss: "Onlinecoaching", // Issuer claim
//       sub: teacher._id,
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: "30m" } // Token expiration set to 30 minutes
//   );
// }
// };

// export default jwtToken;
