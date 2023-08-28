export interface User {
  name: string;
  age: number;
  sex: string;
}

type Omit<O, K extends keyof any> = {
  [k in keyof O as k extends K ? never: k]: O[k];
};

type Omit1<O, K extends keyof any> = Pick<O, Exclude<keyof O, K>>

type User1 = Omit1<User, 'name' | 'age'>;

const user: User1 = {
  sex: '12',
  // name: '1231', error
};
