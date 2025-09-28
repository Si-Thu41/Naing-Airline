import express from 'express';
import { getCity,searchFlight,searchFlightById } from './controllers.js';

const router=express.Router();

router.get('/cities', getCity);
router.get('/searchFlight', searchFlight);
router.get('/searchFlightById', searchFlightById);

export default router;