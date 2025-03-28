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
/**
 * @swagger
 * /api/students/register:
 *   post:
 *     summary: Register a new student
 *     description: Adds a new student to the database.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sName:
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
 *               gender:
 *                 type: string
 *                 example: "male"
 *               parentEmail:
 *                 type: string
 *                 example: "parent@example.com"
 *               parentPhone:
 *                 type: string
 *                 example: "9876543210"
 *               sclass:
 *                 type: string
 *                 example: "10th Grade"
 *     responses:
 *       201:
 *         description: Student registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 sName:
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
router.route('/register').post(registerStudents);
// router.route('/').get(getStudentsList);
// router.route('/edit').put(editStudents);
// router.route('/login').post(authStudents);
// // router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
// // router.route('/forgetPassword').put(forgetpasswords);
// router.get('/email/:email', getStudentsByEmail);

// Export router
export default router;
