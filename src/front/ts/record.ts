export interface User {
  name: string;
  age: number;
  sex: string;
}

type User1 = Record<keyof User, string>;

const user1: User1 = {
  name: '1231',
  age: '1231',
  sex: '123132',
};
