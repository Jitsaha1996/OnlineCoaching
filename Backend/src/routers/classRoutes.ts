import express from 'express';
const router = express.Router();
import {
    addClass,
    getAllClass,
    editClass,
    getClass,
    deleteClass,
    editClassBoards,
    editClassSubject,
} from '../controllers/classController';
import { protect } from '../middleweres/authMiddlewere';
/**
 * @swagger
 * /api/class/add:
 *   post:
 *     summary: Add a new class
 *     description: Admin can add a new class with one or more boards and subjects.
 *     tags:
 *       - Class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - className
 *               - boards
 *             properties:
 *               className:
 *                 type: string
 *                 example: "BTech"
 *               classDescription:
 *                 type: string
 *                 example: "Engineering Undergraduate Program"
 *               boards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - boardName
 *                     - subjects
 *                   properties:
 *                     boardName:
 *                       type: string
 *                       example: "AICTE"
 *                     boardDescription:
 *                       type: string
 *                       example: "All India Council for Technical Education"
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - subjectName
 *                         properties:
 *                           subjectName:
 *                             type: string
 *                             example: "Data Structures"
 *                           subjectDescription:
 *                             type: string
 *                             example: "Study of data organization"
 *                           subjectCode:
 *                             type: string
 *                             example: "CS201"
 *     responses:
 *       201:
 *         description: Class created successfully
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
 *                   example: "Engineering Undergraduate Program"
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b7c3f3b509b734d4ef1a89"
 *                       boardName:
 *                         type: string
 *                         example: "AICTE"
 *                       boardDescription:
 *                         type: string
 *                         example: "All India Council for Technical Education"
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60b7c3f3b509b734d4ef1a90"
 *                             subjectName:
 *                               type: string
 *                               example: "Data Structures"
 *                             subjectDescription:
 *                               type: string
 *                               example: "Study of data organization"
 *                             subjectCode:
 *                               type: string
 *                               example: "CS201"
 *       400:
 *         description: Bad request, class already exists or invalid input
 *       500:
 *         description: Internal server error
 *
 * /api/class/:
 *   get:
 *     summary: Get all classes
 *     description: Retrieve a list of all classes with their boards and subjects.
 *     tags:
 *       - Class
 *     responses:
 *       200:
 *         description: A list of all classes
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
 *                   className:
 *                     type: string
 *                     example: "BTech"
 *                   classDescription:
 *                     type: string
 *                     example: "Engineering Undergraduate Program"
 *                   boards:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         boardName:
 *                           type: string
 *                           example: "AICTE"
 *                         boardDescription:
 *                           type: string
 *                           example: "All India Council for Technical Education"
 *                         subjects:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               subjectName:
 *                                 type: string
 *                                 example: "Data Structures"
 *                               subjectDescription:
 *                                 type: string
 *                                 example: "Study of data organization"
 *                               subjectCode:
 *                                 type: string
 *                                 example: "CS201"
 *       500:
 *         description: Internal server error
 *
 * /api/class/getone/{className}:
 *   get:
 *     summary: Get a single class
 *     description: Retrieve details of a specific class using its name.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: path
 *         name: className
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
 *                 className:
 *                   type: string
 *                   example: "BTech"
 *                 classDescription:
 *                   type: string
 *                   example: "8"
 *       400:
 *         description: Bad request, invalid input
 * /api/class/delete/{className}:
 *   delete:
 *     summary: Delete class
 *     description: Admin can delete a class.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: path
 *         name: className
 *         required: true
 *         schema:
 *           type: string
 *         example: "10"
 *     responses:
 *       200:
 *         description: Class successfully deleted
 *       400:
 *         description: Bad request, invalid input
 * /api/class/edit/{id}:
 *   put:
 *     summary: Edit class
 *     description: Admin can edit an existing class including its name, description, boards, and subjects.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - className
 *               - boards
 *             properties:
 *               className:
 *                 type: string
 *                 example: "BTech Updated"
 *               classDescription:
 *                 type: string
 *                 example: "Updated Engineering Undergraduate Program"
 *               boards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - boardName
 *                     - subjects
 *                   properties:
 *                     boardName:
 *                       type: string
 *                       example: "AICTE Updated"
 *                     boardDescription:
 *                       type: string
 *                       example: "Updated description"
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - subjectName
 *                         properties:
 *                           subjectName:
 *                             type: string
 *                             example: "Advanced Data Structures"
 *                           subjectDescription:
 *                             type: string
 *                             example: "Updated topic focus"
 *                           subjectCode:
 *                             type: string
 *                             example: "CS301"
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
 *                   example: "BTech Updated"
 *                 classDescription:
 *                   type: string
 *                   example: "Updated Engineering Undergraduate Program"
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b7c3f3b509b734d4ef1a89"
 *                       boardName:
 *                         type: string
 *                         example: "AICTE Updated"
 *                       boardDescription:
 *                         type: string
 *                         example: "Updated description"
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60b7c3f3b509b734d4ef1a90"
 *                             subjectName:
 *                               type: string
 *                               example: "Advanced Data Structures"
 *                             subjectDescription:
 *                               type: string
 *                               example: "Updated topic focus"
 *                             subjectCode:
 *                               type: string
 *                               example: "CS301"
 *       400:
 *         description: Bad request, class already exists or invalid input
 *       404:
 *         description: Class not found
 *       500:
 *         description: Internal server error
 * /api/class/editboards/{className}:
 *   put:
 *     summary: Edit boards of a specific class
 *     description: Admin can update the entire boards array of a class using its name.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: path
 *         name: className
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the class whose boards need to be updated
 *         example: "BTech"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - boards
 *             properties:
 *               boards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - boardName
 *                     - subjects
 *                   properties:
 *                     boardName:
 *                       type: string
 *                       example: "AICTE"
 *                     boardDescription:
 *                       type: string
 *                       example: "All India Council for Technical Education"
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - subjectName
 *                         properties:
 *                           subjectName:
 *                             type: string
 *                             example: "Data Structures"
 *                           subjectDescription:
 *                             type: string
 *                             example: "Study of data organization"
 *                           subjectCode:
 *                             type: string
 *                             example: "CS201"
 *     responses:
 *       200:
 *         description: Boards updated successfully
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
 *                   example: "Engineering Undergraduate Program"
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b7c3f3b509b734d4ef1a89"
 *                       boardName:
 *                         type: string
 *                         example: "AICTE"
 *                       boardDescription:
 *                         type: string
 *                         example: "All India Council for Technical Education"
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "60b7c3f3b509b734d4ef1a90"
 *                             subjectName:
 *                               type: string
 *                               example: "Data Structures"
 *                             subjectDescription:
 *                               type: string
 *                               example: "Study of data organization"
 *                             subjectCode:
 *                               type: string
 *                               example: "CS201"
 *       400:
 *         description: Boards data is required
 *       404:
 *         description: Class with the given name was not found
 *       500:
 *         description: Internal server error
  * /api/class/editsubject/{classId}/{boardName}:
 *   post:
 *     summary: Edit subjects of a specific board within a class
 *     description: Admin can update the subjects of a specific board in a given class.
 *     tags:
 *       - Class
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the class
 *         example: "BTech"
 *       - in: path
 *         name: boardName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the board whose subjects need to be updated
 *         example: "AICTE"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *             properties:
 *               subject:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - subjectName
 *                   properties:
 *                     subjectName:
 *                       type: string
 *                       example: "Operating Systems"
 *                     subjectDescription:
 *                       type: string
 *                       example: "Study of OS principles"
 *                     subjectCode:
 *                       type: string
 *                       example: "CS202"
 *     responses:
 *       200:
 *         description: Subjects updated successfully
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
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       boardName:
 *                         type: string
 *                         example: "AICTE"
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             subjectName:
 *                               type: string
 *                               example: "Operating Systems"
 *                             subjectDescription:
 *                               type: string
 *                               example: "Study of OS principles"
 *                             subjectCode:
 *                               type: string
 *                               example: "CS202"
 *       400:
 *         description: Subjects data is required
 *       404:
 *         description: Board with the given name not found
 *       500:
 *         description: Internal server error
 
 */
router.route('/add').post(protect,addClass);
router.route('/').get(protect,getAllClass);
router.route('/edit/:id').put(protect,editClass);    
router.route('/getone/:className').get(protect,getClass);      
router.route('/delete/:className').delete(protect,deleteClass);
router.route('/editboards/:className').put(protect,editClassBoards);
router.route('/editsubject/:classId/:boardName').post(protect,editClassSubject);
export default router;
