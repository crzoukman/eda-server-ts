import { Request, Response } from "express";
import { omit } from "lodash";
import { privateFields } from "../model/user.model";
import { findSessionById, getQuestion, restorePassword, signAccessToken, signRefreshToken } from "../service/auth.service";
import { findUserById, findUserByUsername } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";
import argon2 from 'argon2';

export async function createSessionHandler(
  req: Request,
  res: Response
) {
  const message = 'Invalid email or password';
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (!user) return res.send(message);

  const isValid = await user.validatePassword(password);
  if (!isValid) return res.status(401).send(message);

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user._id });

  const userData = omit(user.toJSON(), privateFields);

  return res.send({
    ...userData,
    accessToken,
    refreshToken,
  });
}

export async function refreshAccessTokenHandler(
  req: Request,
  res: Response
) {
  const token = req.headers['x-refresh'] as string;

  const decoded = verifyJwt<{ session: string }>(
    token || '',
    'refreshTokenPublicKey'
  );

  if (!decoded) {
    return res.status(401).send('Could not refresh access token');
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send('Could not refresh access token');
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send('Could not refresh access token');
  }

  const accessToken = signAccessToken(user);

  res.send({ accessToken });
}

export async function getQuestionHandler(
  req: Request,
  res: Response
) {
  const user = await getQuestion(req.query);

  if (!user) res.status(404).send('Could not find user');

  res.send(user[0].question);
}

export async function restorePasswordHandler(
  req: Request,
  res: Response
) {
  const { username, answer, password } = req.body;

  const user = await findUserByUsername(username);

  if (!user) res.status(500).send('Something happend while restoring password');

  if (answer.toLowerCase() !== user?.answer.toLowerCase()) {
    return res.status(403).send('Wrong password');
  }

  const hash = await argon2.hash(password);

  await restorePassword(hash, String(user?._id));

  res.send('Password has been updated');
}