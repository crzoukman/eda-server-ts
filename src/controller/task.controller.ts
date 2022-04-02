import { Request, Response } from "express";
import { addTask, deleteTask, editTask, getTasks } from "../service/task.service";

export async function getTasksHandler(
  req: Request,
  res: Response
) {
  const id = req.query.id as string;
  const tasks = await getTasks(id);

  res.send(tasks);
}

export async function addTaskHandler(
  req: Request,
  res: Response
) {
  const response = await addTask(req.body);
  res.send(response);
}

export async function deleteTaskHandler(
  req: Request,
  res: Response
) {
  const id = req.params.id as string;
  const response = await deleteTask(id);

  res.send(response);
}

export async function editTaskHandler(
  req: Request,
  res: Response
) {
  const response = await editTask(req.body);
  res.send(response);
}