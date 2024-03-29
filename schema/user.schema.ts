import { object, string, TypeOf } from "zod";


export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),

    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password is too short - must be min 8 chars'),

    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),

    email: string({
      required_error: 'Email is required',
    }),
  }).refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }
  ),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];