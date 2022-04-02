import { Router } from "express";
import { addTaskHandler, deleteTaskHandler, editTaskHandler, getTasksHandler } from "../controller/task.controller";

const router = Router();

router.get(
  '/api/tasks',
  getTasksHandler
);

router.post(
  '/api/tasks',
  addTaskHandler,
);

router.delete(
  '/api/tasks/:id',
  deleteTaskHandler
);

router.put(
  '/api/tasks',
  editTaskHandler
);

export default router;