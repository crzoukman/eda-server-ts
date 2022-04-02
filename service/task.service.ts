import { DocumentType } from "@typegoose/typegoose";
import TaskModel, { Task } from "../model/task.model";

export function getTasks(id: string) {
  return TaskModel.find({ userId: id });
}

export function addTask(data: DocumentType<Task>) {
  return TaskModel.create(data);
}

export function deleteTask(id: string) {
  return TaskModel.findByIdAndDelete(id);
}

export function editTask(task: DocumentType<Task>) {
  return TaskModel.findByIdAndUpdate(task._id, task);
}