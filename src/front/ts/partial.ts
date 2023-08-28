export interface User {
  name: string;
  age: number;
  sex: string;
}

type Partial<T> = {
  [k in keyof T]?: T[k];
};

// 全部变可选的
type User1 = Partial<User>;
