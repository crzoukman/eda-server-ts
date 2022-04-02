import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, updateProfile } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {

  try {
    const body = req.body;

    await createUser(body);

    return res.send('User has been created');
  } catch (e: any) {
    if (e.code = 11000) {
      return res.status(409).send('User already exists');
    }

    return res.status(500).send(e);
  }
}

export async function updateProfileHandler(
  req: Request,
  res: Response
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const profileData = req.body;

    const decoded = verifyJwt(
      token || '',
      'accessTokenPublicKey'
    );

    if (!decoded) res.status(403).send('Access token is not valid');

    const updated = await updateProfile(profileData);

    if (!updated) res.status(500).send('Could not update profile');

    res.send('Profile has been updated');
  } catch (e: any) {

  }
}