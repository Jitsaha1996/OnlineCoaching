import express from "express";
const router = express.Router();

// Import functions using ES6 import syntax
import { 
  registerTeachers, 
  authTeachers, 
  // getTeachersList, 
  // editTeachers, 
  // getTeachersByEmail 
  forgetPasswords
} from "../controllers/teacherController";
/**
 * @swagger
 * /api/teachers/register:
 *   post:
 *     summary: Register a new teacher
 *     description: Adds a new teacher to the database.
 *     tags:
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               pic:
 *                 type: string
 *                 example: "base64encodedstring"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               isArchived:
 *                 type: boolean
 *                 example: false
 *               userType:
 *                 type: string
 *                 example: "student"
 *               qualification:
 *                 type: string
 *                 example: "Btech"
 *               experience:
 *                 type: string
 *                 example: "2years"
 *               isModified:
 *                 type: boolean
 *              example: false
 *                
 *             
 *     responses:
 *       201:
 *         description: Teacher registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 tName:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *       400:
 *         description: Bad request, invalid input
 */
// Define routes
router.route('/register').post(registerTeachers);
// router.route('/').get(getTeachersList);
// router.route('/edit').put(editTeachers);
router.route('/login').post(authTeachers);
// // router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
router.route('/forgetPassword').put(forgetPasswords);
// router.get('/email/:email', getTeachersByEmail);

// Export router
export default router;
