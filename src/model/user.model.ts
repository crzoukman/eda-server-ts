import argon2 from 'argon2';
import { DocumentType, getModelForClass, modelOptions, prop, pre } from '@typegoose/typegoose';
import logger from '../utils/logger';


export const privateFields = [
  'password',
  '__v',
];

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  logger.info('@pre');

  const hash = await argon2.hash(this.password);
  this.password = hash;

  return;
})

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

export class User {
  @prop({
    unique: true,
    lowercase: true,
    required: true,
  })
  username: string;

  @prop({
    required: true,
  })
  password: string;

  @prop({
    lowercase: true,
    required: true,
    unique: true,
  })
  email: string;

  @prop({
    default: '',
  })
  firstname: string;

  @prop({
    default: '',
  })
  lastname: string;

  @prop({
    default: '',
  })
  patronymic: string;

  @prop({
    default: '',
  })
  question: string;

  @prop({
    default: '',
  })
  answer: string;

  async validatePassword(
    this: DocumentType<User>,
    candidate: string
  ) {
    try {
      logger.info('Password has been validated');
      return await argon2.verify(this.password, candidate);
    } catch (e: any) {
      logger.error(e, 'Could not validate the password');
      return false;
    }
  }
}

const UserModel = getModelForClass(User);

export default UserModel;