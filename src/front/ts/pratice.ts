
//  1. 泛型返回值
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T',
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    ...u,
    id: u.id,
    kind: 'customer'
  }
}


// 2. 函数重载
// function f(a: string | number, b: string | number) {
//   if (typeof a === 'string') {
//     return a + ':' + b; // no error but b can be number!
//   } else {
//     return a + b; // error as b can be number | string
//   }
// }

function f1(a: string, b: string):string;
function f1(a: number, b: number):number;
function f1(a: string | number, b: string | number) {
  if (typeof a === 'string'||typeof b === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}









