import express from 'express';
const router = express.Router();
import {
    addClass,
    getAllClass,
    editClass,
    getClass,
    // deleteQualification,
} from '../controllers/classController';
import { protect } from '../middleweres/authMiddlewere';
/**
 * @swagger
 * /api/class/add:
 *   post:
 *     summary: Add class
 *     description: Admin can add class.
 *     tags:
 *       - Classes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *                 example: "10"
 *               classDescription:
 *                 type: string
 *                 example: "10th grade"
 *     responses:
 *       201:
 *         description: Qualification added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 className:
 *                   type: string
 *                   example: "BTech"
 *                 classDescription:
 *                   type: string
 *                   example: "Bachelor of Technology in Computer Science"
 *       400:
 *         description: Bad request, invalid input
 *
 * /api/class/:
 *   get:
 *     summary: Get all qualifications
 *     description: Retrieve a list of all qualifications.
 *     tags:
 *       - Classes
 *     responses:
 *       201:
 *         description: A list of qualifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60b7c3f3b509b734d4ef1a88"
 *                 className:
 *                   type: string
 *                   example: "BTech"
 *                 classDescription:
 *                   type: string
 *                   example: "Bachelor of Technology in Computer Science"
 *       400:
 *         description: Bad request, invalid input
 * 
 * /api/qualification/getone:
 *   get:
 *     summary: Get a single qualification
 *     description: Retrieve details of a specific qualification using its name.
 *     tags:
 *       - Qualifications
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: "BTech"
 *     responses:
 *       200:
 *         description: Qualification details
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
 *                   example: "Bachelor of Technology in Computer Science"
 *       400:
 *         description: Bad request, invalid input
 */
router.route('/add').post(protect,addClass);
router.route('/').get(protect,getAllClass);
router.route('/edit').put(protect,editClass);    
router.route('/getone').get(protect,getClass);      
// router.route('/delete').delete(deleteQualification);


export default router;
