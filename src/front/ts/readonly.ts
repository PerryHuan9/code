export interface User {
  name: string;
  age: number;
  sex: string;
}

type Readonly<T> = {
  readonly [k in keyof T]: T[k];
};

type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  name: '1231',
  age: 123,
  sex: '1231',
};

// user.name = '123123' // error , can't set
