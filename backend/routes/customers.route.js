import express from 'express';
import { signup } from '../controller/auth.login.js';

const customersRouter = express.Router();

// POST /api/customers/register - wraps signup with account_type: 'customer'
customersRouter.post('/register', (req, res, next) => {
  req.body.account_type = 'customer';
  return signup(req, res);
});

export { customersRouter };
