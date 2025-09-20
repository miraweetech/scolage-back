import express from "express";
import {
  createInstitute,
  deleteInstitute,
  getAllInstitutes,
  getInstituteById,
  updateBasicDetails,
  updateCampusDetails,
  updateEligibilityDetails,
  updateEmailDetails,
  updateGalleries,
  updateHighlightsDetails,
  updateImageDetails,
  updateInstitute,
  updateLocationDetails,
  updatePhoneDetails,
  updatePrimaryDetails,
  updateShiftDetails,
  updateSocialMediaDetails,
  updateStaffManagement,
  updateSubjectDetails,
  updateThreedImageDetails,
  updateYoutubeLinkDetails,
} from "../controllers/instituteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const instituteApis = express.Router();

instituteApis.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   - name: Institutes
 *     description: Institute management APIs
 */

/**
 * @swagger
 * /v1/institute:
 *   post:
 *     summary: Create a new institute
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sardar Patel University
 *               address:
 *                 type: string
 *                 example: Vallabh Vidyanagar, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Institute created successfully
 */
instituteApis.post("/", createInstitute);

/**
 * @swagger
 * /v1/institute:
 *   get:
 *     summary: Get all institutes
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of institutes
 */
instituteApis.get("/", getAllInstitutes);

/**
 * @swagger
 * /v1/institute/{id}:
 *   get:
 *     summary: Get an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Institute details
 *       404:
 *         description: Institute not found
 */
instituteApis.get("/:id", getInstituteById);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/:id", updateInstitute);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/basic-details/:id", updateBasicDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/primary-details/:id", updatePrimaryDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/cumpus-details/:id", updateCampusDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/location-details/:id", updateLocationDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/eligibility/:id", updateEligibilityDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/email-details/:id", updateEmailDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/shift-details/:id", updateShiftDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/highlight-details/:id", updateHighlightsDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/phone-details/:id", updatePhoneDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/social-media/:id", updateSocialMediaDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/youtube-link/:id", updateYoutubeLinkDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/subject/:id", updateSubjectDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/staffmanagement/:id", updateStaffManagement);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/galleries/:id", updateGalleries);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/Image/:id", updateImageDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   put:
 *     summary: Update an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gujarat University
 *               address:
 *                 type: string
 *                 example: Ahmedabad, Gujarat
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.patch("/3D-Image/:id", updateThreedImageDetails);

/**
 * @swagger
 * /v1/institute/{id}:
 *   delete:
 *     summary: Delete an institute by ID
 *     tags: [Institutes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Institute deleted successfully
 *       404:
 *         description: Institute not found
 */
instituteApis.delete("/:id", deleteInstitute);

export default instituteApis;
