import express from 'express';
import { getClients, createClient, deleteClient, updateClient } from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);
router.put('/:id', updateClient);

export default router;
