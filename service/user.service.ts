import { DocumentType } from "@typegoose/typegoose";
import UserModel, { User } from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";

export function createUser(input: CreateUserInput) {
  return UserModel.create(input);
}

export function findUserByUsername(username: string) {
  return UserModel.findOne({ username });
}

export function updateProfile(data: DocumentType<User>) {
  return UserModel.findByIdAndUpdate(data._id, data);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}