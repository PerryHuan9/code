export interface User {
  name: string;
  age: number;
  sex: string;
}

type Pick<O, K extends keyof O> = {
  [k in K]: O[k];
};

type User1 = Pick<User, 'name' | 'age'>;

const user: User1 = {
  name: 'perry',
  age: 12,
};
