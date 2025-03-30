import express from "express";
const router = express.Router();

// Import functions using ES6 import syntax
import { 
  registerStudents, 
  authStudents, 
  // getStudentsList, 
  // editStudents, 
  // getStudentsByEmail 
  forgetPasswords
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
 * /api/students/login:
 *   post:
 *     summary: Authenticate student and get token
 *     description: Logs in a student and returns an authentication token.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login, returns student details and token
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
 *                   example: "Jane Doe"
 *                 email:
 *                   type: string
 *                   example: "jane.doe@example.com"
 *                 isArchived:
 *                   type: boolean
 *                   example: false
 *                 userType:
 *                   type: string
 *                   example: "student"
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *       401:
 *         description: Unauthorized, invalid phone or password
 *       400:
 *         description: Bad request, missing phone or password
 * /api/students/forgetPassword:
 *   put:
 *     summary: Reset student password
 *     description: Allows a student to reset their password using their phone number.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               newPassword:
 *                 type: string
 *                 example: "NewPassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "1234567890 updated successfully!"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request, missing phone or password
 *       404:
 *         description: Student not found
 */
// Define routes
router.route('/register').post(registerStudents);
// router.route('/').get(getStudentsList);
// router.route('/edit').put(editStudents);
router.route('/login').post(authStudents);
// // router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
router.route('/forgetPassword').put(forgetPasswords);
// router.get('/email/:email', getStudentsByEmail);

// Export router
export default router;
