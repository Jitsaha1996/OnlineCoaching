import express from 'express';
const router = express.Router();
import {
    addSubject,
    getAllSubject,
    editSubject,
    getSubject,
    deleteSubject,
} from '../controllers/subjectController';
import { protect } from '../middleweres/authMiddlewere';
/**
 * @swagger
 * /api/Subject/add:
 *   post:
 *     summary: Add Subject
 *     description: Admin can add Subject.
 *     tags:
 *       - Subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              subjectName:
 *                 type: string
 *                 example: "10"
 *              subjectDescription:
 *                 type: string
 *                 example: "10th grade"
 *     responses:
 *       201:
 *         description: Subject added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 subjectName:
 *                   type: string
 *                   example: "BTech"
 *                 subjectDescription:
 *                   type: string
 *                   example: "10"
 *       400:
 *         description: Bad request, invalid input
 *
 * /api/Subject/getall:
 *   get:
 *     summary: Get all Subject
 *     description: Retrieve a list of all Subjects.
 *     tags:
 *       - Subject
 *     responses:
 *       201:
 *         description: A list of Subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 subjectName:
 *                   type: string
 *                   example: "BTech"
 *                 subjectDescription:
 *                   type: string
 *                   example: "12"
 *       400:
 *         description: Bad request, invalid input
 * 
 * /api/Subject/getone:
 *   get:
 *     summary: Get a single Subject
 *     description: Retrieve details of a specific Subject using its name.
 *     tags:
 *       - Subject
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: "9"
 *     responses:
 *       200:
 *         description: Subject details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 name:
 *                   type: string
 *                   example: "BTech"
 *                 description:
 *                   type: string
 *                   example: "8"
 *       400:
 *         description: Bad request, invalid input
 * 
 * /api/Subject/edit:
 *   put:
 *     summary: Edit Subject
 *     description: Admin can edit Subject details.
 *     tags:
 *       - Subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SubjectId:
 *                 type: string
 *                 example: "60b7c3f3b509b734d4ef1a88"
 *              SubjectName:
 *                 type: string
 *                 example: "12"
 *              SubjectDescription:
 *                 type: string
 *                 example: "12"
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 subjectName:
 *                   type: string
 *                   example: "12"
 *                 subjectDescription:
 *                   type: string
 *                   example: "12"
 *       400:
 *         description: Bad request, invalid input
 * 
 * /api/Subject/delete:
 *   delete:
 *     summary: Delete Subject
 *     description: Admin can delete a Subject.
 *     tags:
 *       - Subject
 *     parameters:
 *       - in: query
 *         name: SubjectId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60b7c3f3b509b734d4ef1a88"
 *     responses:
 *       200:
 *         description: Subject successfully deleted
 *       400:
 *         description: Bad request, invalid input
 */
router.route('/add').post(protect,addSubject);
router.route('/').get(protect,getAllSubject);
router.route('/edit').put(protect,editSubject);    
router.route('/getone').get(protect,getSubject);      
router.route('/delete').delete(protect,deleteSubject);


export default router;
