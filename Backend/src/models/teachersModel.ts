import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { ITeachers } from "../common/ITeachers";

const teachersSchemaTS: Schema<ITeachers> = new mongoose.Schema(
  {
    tName: {
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
  
  isAdmin:{
    type: Boolean,
    required: true,
    default:false,
  },
  qualification:{
    type: String,
    required: true,
  },
  experience:{
    type : String,
    required: true,
  },
   
    userType: {
      type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
teachersSchemaTS.pre<ITeachers>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
teachersSchemaTS.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const TeacherTS: Model<ITeachers> = mongoose.model<ITeachers>("TeachersTS", teachersSchemaTS);

export default TeacherTS;
