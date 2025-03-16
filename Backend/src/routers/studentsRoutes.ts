import express from "express";
const router = express.Router();

// Import functions using ES6 import syntax
import { 
  registerStudents, 
  // authStudents, 
  // getStudentsList, 
  // editStudents, 
  // getStudentsByEmail 
} from "../controllers/studentController";

// Define routes
router.route('/register').post(registerStudents);
// router.route('/').get(getStudentsList);
// router.route('/edit').put(editStudents);
// router.route('/login').post(authStudents);
// // router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
// // router.route('/forgetPassword').put(forgetpasswords);
// router.get('/email/:email', getStudentsByEmail);

// Export router
export default router;
