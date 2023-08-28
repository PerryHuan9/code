export interface User {
  name: string;
  age?: number;
  sex?: string;
}

type Required<T> = {
  [k in keyof T]-?: T[k];
};

type RequiredUser = Required<User>;

const use: User = {
  name: '123',
};

const user1: RequiredUser = {
  name: '1231',
  age: 12,
  sex: '',
};
