import { Router } from "express";
import { createUserHandler, updateProfileHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResourse";
import { createUserSchema } from "../schema/user.schema";

const router = Router();

router.post(
  '/api/create',
  validateResource(createUserSchema),
  createUserHandler
);

router.post(
  '/api/update',
  updateProfileHandler
);

export default router;