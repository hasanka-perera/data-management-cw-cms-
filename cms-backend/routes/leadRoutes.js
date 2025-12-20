import express from 'express';
import { getLeads, createLead, deleteLead, convertToClient } from '../controllers/leadController.js';

const router = express.Router();

router.get('/', getLeads);
router.post('/', createLead);
router.delete('/:id', deleteLead);
router.post('/convert/:id', convertToClient);

export default router;
