import express from "express";
const router = express.Router();

// Import functions using ES6 import syntax
import { 
  registerTeachers, 
  authTeachers, 
  getTeachersList, 
  editTeachers, 
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
 *                 example: "teacher"
 *               qualification:
 *                 type: string
 *                 example: "BTech"
 *               experience:
 *                 type: string
 *                 example: "2 years"
 *               isModified:
 *                 type: boolean
 *                 example: false
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
 *                 isAdmin:
 *                   type: boolean
 *                   example: false
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                 dob:
 *                   type: string
 *                   format: date
 *                   example: "2000-01-01"
 *                 userType:
 *                   type: string
 *                   example: "teacher"
 *                 isArchived:
 *                   type: boolean
 *                   example: false
 *                 qualification:
 *                   type: string
 *                   example: "BTech"
 *                 experience:
 *                   type: string
 *                   example: "2 years"
 *                 isModified:
 *                   type: boolean
 *                   example: false
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *       400:
 *         description: Bad request, invalid input
 * /api/teachers/login:
 *   post:
 *     summary: Authenticate teacher and get token
 *     description: Logs in a teacher and returns an authentication token.
 *     tags:
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                 type: string
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login, returns user details and token
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
 *                 isAdmin:
 *                   type: boolean
 *                   example: false
 *                 userType:
 *                   type: string
 *                   example: "teacher"
 *                 isArchived:
 *                   type: boolean
 *                   example: false
 *                 pic:
 *                   type: string
 *                   example: "base64encodedstring"
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
 * /api/teachers/forgetPassword:
 *   put:
 *     summary: Reset teacher password
 *     description: Allows a teacher to reset their password using their phone number.
 *     tags:
 *       - Teachers
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
 *         description: Teacher not found
 * /api/teachers/:
 *   get:
 *     summary: All teacher list
 *     description: After login or register, get the list of all teachers.
 *     tags:
 *       - Teachers
 *     responses:
 *       200:
 *         description: Successful login, returns teacher details and token
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
 * /api/teachers/edit:
 *   put:
 *     summary: Edit teacher details
 *     description: Allows a teacher to edit their details.
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
 *               pic:
 *                 type: string
 *                 example: "base64encodedstring"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               isArchived:
 *                 type: boolean
 *                 example: false
 *               qualification:
 *                 type: string
 *                 example: "BTech"
 *               experience:
 *                 type: string
 *                 example: "2 years"
 *               isModified:
 *                 type: boolean
 *                 example: false
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 * 
 *     responses:
 *       200:
 *         description: Teacher details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Teacher details updated successfully"
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Teacher not found
 */
 
// Define routes
router.route('/register').post(registerTeachers);
router.route('/').get(getTeachersList);
router.route('/edit').put(editTeachers);
router.route('/login').post(authTeachers);
// // router.route('/paymentinfo').put(paymentInfoForFamilyWidse);
router.route('/forgetPassword').put(forgetPasswords);
// router.get('/email/:email', getTeachersByEmail);

// Export router
export default router;
