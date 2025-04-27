import express from 'express';
const router = express.Router();
import {
    addClass,
    getAllClass,
    editClass,
    getClass,
    deleteClass,
} from '../controllers/classController';
import { protect } from '../middleweres/authMiddlewere';
/**
 * @swagger
 * /api/class/add:
 *   post:
 *     summary: Add class
 *     description: Admin can add class.
 *     tags:
 *       - Class
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
 *         description: Class added successfully
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
 *                   example: "10"
 *       400:
 *         description: Bad request, invalid input
 *
 * /api/class/getall:
 *   get:
 *     summary: Get all class
 *     description: Retrieve a list of all classes.
 *     tags:
 *       - Class
 *     responses:
 *       201:
 *         description: A list of classes
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
 *                   example: "12"
 *       400:
 *         description: Bad request, invalid input
 * 
 * /api/class/getone:
 *   get:
 *     summary: Get a single class
 *     description: Retrieve details of a specific class using its name.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: "9"
 *     responses:
 *       200:
 *         description: Class details
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
 * /api/class/edit:
 *   put:
 *     summary: Edit class
 *     description: Admin can edit class details.
 *     tags:
 *       - Class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *                 example: "60b7c3f3b509b734d4ef1a88"
 *               className:
 *                 type: string
 *                 example: "12"
 *               classDescription:
 *                 type: string
 *                 example: "12"
 *     responses:
 *       200:
 *         description: Class updated successfully
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
 *                   example: "12"
 *                 classDescription:
 *                   type: string
 *                   example: "12"
 *       400:
 *         description: Bad request, invalid input
 * 
 * /api/class/delete:
 *   delete:
 *     summary: Delete class
 *     description: Admin can delete a class.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: query
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         example: "60b7c3f3b509b734d4ef1a88"
 *     responses:
 *       200:
 *         description: Class successfully deleted
 *       400:
 *         description: Bad request, invalid input
 */
router.route('/add').post(protect,addClass);
router.route('/').get(protect,getAllClass);
router.route('/edit').put(protect,editClass);    
router.route('/getone').get(protect,getClass);      
router.route('/delete').delete(protect,deleteClass);


export default router;
