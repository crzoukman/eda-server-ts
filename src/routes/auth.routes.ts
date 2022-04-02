import { Router } from "express";
import { createSessionHandler, getQuestionHandler, refreshAccessTokenHandler, restorePasswordHandler } from "../controller/auth.controller";

const router = Router();

router.post(
  '/api/session',
  createSessionHandler
);

router.post(
  '/api/refresh',
  refreshAccessTokenHandler
);

router.get(
  '/api/restore',
  getQuestionHandler
);

router.post(
  '/api/restore',
  restorePasswordHandler
);

export default router;