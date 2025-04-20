import express from 'express';
const router = express.Router();
import {
    addQualification,
    getAllQualification,
    // editQualification,
    getQualification,
    // deleteQualification,
} from '../controllers/qualificationController';
import { protect } from '../middleweres/authMiddlewere';
/**
 * @swagger
 * /api/qualification/add:
 *   post:
 *     summary: Add qualification
 *     description: Admin can add qualification.
 *     tags:
 *       - Qualifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "BTech"
 *               description:
 *                 type: string
 *                 example: "Bachelor of Technology in Computer Science"
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
 *                 name:
 *                   type: string
 *                   example: "BTech"
 *                 description:
 *                   type: string
 *                   example: "Bachelor of Technology in Computer Science"
 *       400:
 *         description: Bad request, invalid input
 *
 * /api/qualification/:
 *   get:
 *     summary: Get all qualifications
 *     description: Retrieve a list of all qualifications. Requires a Bearer token.
 *     tags:
 *       - Qualifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of qualifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60b7c3f3b509b734d4ef1a88"
 *                   name:
 *                     type: string
 *                     example: "BTech"
 *                   description:
 *                     type: string
 *                     example: "Bachelor of Technology in Computer Science"
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, token missing or invalid
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
router.route('/add').post(protect,addQualification);
router.route('/').get(protect,getAllQualification);
// router.route('/edit').put(editQualification);    
router.route('/getone').get(protect,getQualification);      
// router.route('/delete').delete(deleteQualification);


export default router;
