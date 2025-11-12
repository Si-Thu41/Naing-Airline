import express from 'express';
import { getCity,searchFlight,searchFlightById,saveTravelerInfo,bookFlight, seeBookings } from './controllers.js';

const router=express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}
router.get('/cities', ensureAuthenticated, getCity);
router.get('/searchFlight', ensureAuthenticated, searchFlight);
router.get('/searchFlightById', ensureAuthenticated, searchFlightById);
router.post('/saveTravelerInfo', ensureAuthenticated, saveTravelerInfo);
router.post('/bookFlight', ensureAuthenticated, bookFlight);
router.get('/seeBookings',ensureAuthenticated,seeBookings);

//Uncomment this to test without authentication
// router.get('/cities', getCity);
// router.get('/searchFlight', searchFlight);
// router.get('/searchFlightById', searchFlightById);
// router.post('/saveTravelerInfo', saveTravelerInfo);
// router.post('/bookFlight', bookFlight);


export default router;