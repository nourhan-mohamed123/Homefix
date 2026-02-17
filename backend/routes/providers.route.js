import express from 'express';
import { signup } from '../controller/auth.login.js';

const providersRouter = express.Router();

// POST /api/providers/register - wraps signup with account_type: 'provider'
providersRouter.post('/register', (req, res, next) => {
  req.body.account_type = 'provider';
  return signup(req, res);
});

export { providersRouter };
