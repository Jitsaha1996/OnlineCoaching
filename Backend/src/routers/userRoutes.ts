import express from "express";
const router = express.Router();

// Import functions using ES6 import syntax
import { 
  registerUsers, 
  authUsers, 
  getUserList, 
  editUsers, 
  getUserByEmail 
} from "../controllers/userController";

// Define routes
router.route('/').post(registerUsers);
router.route('/').get(getUserList);
router.route('/edit').put(editUsers);
router.route('/login').post(authUsers);
// router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
// router.route('/forgetPassword').put(forgetpasswords);
router.get('/email/:email', getUserByEmail);

// Export router
export default router;
