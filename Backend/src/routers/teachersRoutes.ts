import express from "express";
const router = express.Router();

// Import functions using ES6 import syntax
import { 
  registerTeachers, 
  authTeachers, 
  getTeachersList, 
  editTeachers, 
  getTeachersByEmail 
} from "../controllers/teacherController";

// Define routes
router.route('/').post(registerTeachers);
router.route('/').get(getTeachersList);
router.route('/edit').put(editTeachers);
router.route('/login').post(authTeachers);
// router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
// router.route('/forgetPassword').put(forgetpasswords);
router.get('/email/:email', getTeachersByEmail);

// Export router
export default router;
