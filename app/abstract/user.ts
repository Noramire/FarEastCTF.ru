type DatabaseUnit = {
  _id?: string,
}

type User = Partial<{
  id: string,
  username: string,
  email: string,
  password: string,
  admin: boolean,
}>;

type DatabaseUser = DatabaseUnit & User & { id?: never };

export type {
  DatabaseUnit,
  DatabaseUser,
  User,
};
