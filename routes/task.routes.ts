import { Router } from "express";
import { refreshAccessTokenHandler } from "../controller/auth.controller";
import { addTaskHandler, deleteTaskHandler, editTaskHandler, getTasksHandler } from "../controller/task.controller";
import checkToken from "../middleware/checkToken";

const router = Router();

router.get(
  '/api/tasks',

  getTasksHandler
);

router.post(
  '/api/tasks',
  checkToken,
  addTaskHandler,
);

router.delete(
  '/api/tasks/:id',
  checkToken,
  deleteTaskHandler
);

router.put(
  '/api/tasks',
  checkToken,
  editTaskHandler
);

router.get(
  '/api/tasks/refresh',
  refreshAccessTokenHandler
);

export default router;