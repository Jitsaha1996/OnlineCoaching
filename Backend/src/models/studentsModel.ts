import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { IStudents } from "../common/IStudents";

const studentsSchemaTS: Schema<IStudents> = new mongoose.Schema(
  {
    sName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isArchived: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentEmail: {
      type: String,
      required: true,
    },
    parentPhone: {
      type: String,
      required: true,
    },
    sclass: {
      type: String,
      required: true,
    },  
    userType: {
      type: String,
        required: true,
    },
    examDetails: [
                    {
                      examName: {
                        type: String,
                        required: true,
                      },
                      examDate: {
                        type: Date,
                        required: true,
                      },
                      marksObtained: {
                        type: String,
                        required: true,
                      },
                      totalMarks: {
                        type: String,
                        required: true,
                      },
                      remarks: {
                        type: String,
                        required: true,
                      },
                    },
                  ],

    teacherDetails: [
                      {
                        teacherName: {
                          type: String,
                          required: true,
                        },
                        teacherId: {
                          type: String,
                          required: true,
                        },
                        teacherEmail: {
                          type: String,
                          required: true,
                        },
                        subject: {
                          type: String,
                          required: true,
                        },
                      },
                    ],
  },

  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
studentsSchemaTS.pre<IStudents>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
studentsSchemaTS.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const StudentTS: Model<IStudents> = mongoose.model<IStudents>("StudentsTS", studentsSchemaTS);

export default StudentTS;
