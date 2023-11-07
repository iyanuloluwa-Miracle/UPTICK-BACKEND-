import express, { Request, Response } from
 
'express';
import AuthController from
 
'../controllers/authController';

const router = express.Router(); // Initialize the router object

router.post('/signup', AuthController.signup); // Define the route for signup
router.post('/login', AuthController.login); // Define the route for login

export default router; // Export the router object