/**
 * 1.定义一个 ConditionalPick工具类型，支持根据指定的 Condition 条件来生成新的类型
 *
 */
export type ConditionalPick<O, T> = {
  [k in keyof O as O[k] extends T ? k : never]: T;
};

interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}

/**
 * 2.定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是x，将作为新函数类型的第一个参数
 *
 */

type Fn = (a: number, b: string) => number;
type AppendArgument<F extends (...arg: any) => any, A> = F extends (...arg: infer a) => any
  ? (first: A, ...rest: a) => any
  : never;
type FinalFn = AppendArgument<Fn, boolean>;
// (x: boolean, a: number, b: string) => number

/**
 * 3.定义一个NativeFlat工具类型，支持把数组类型拍平（扁平化）
 *
 */
type NaiveFlat<T extends any[]> = T extends (infer I)[] ? (I extends any[] ? NaiveFlat<I> : I) : never;

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], [['b', 'c']], ['d']]>;

// NaiveResult的结果： "a" | "b" | "c" | "d"

/**
 *
 * 4.使用类型别名定义一个EmptyObject类型，使得该类型只允许空对象赋值：
 *
 */

type EmptyObject = {
  [k in keyof any]: never;
};

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
// const shouldFail: EmptyObject = { // 将出现编译错误
//   prop: "TS"
// }

/**
 * 5.定义NonEmptyArray工具类型，用于确保数据非空数组。
 */

type NonEmptyArray<T> = [T, ...T[]];

// const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS']; // 非空数据，正常使用

/**
 * 6.定义一个JoinStrArray工具类型，用于根据指定的Separator分隔符，对字符串数组类型进行拼接
 *
 */
type JoinStrArray<Arr extends string[], Separator extends string> = Arr extends [infer A, ...infer R]
  ? `${A extends string ? A : ''}${R extends [string, ...string[]] ? `${Separator}${JoinStrArray<R, Separator>}` : ''}`
  : '';
// 测试用例
type Names = ['Sem', 'Lolo', 'Kaquko'];
type NamesComma = JoinStrArray<Names, ','>; // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, ' '>; // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, '⭐️'>; // "Sem⭐️Lolo⭐️Kaquko"

/**
 * 7.实现一个Trim工具类型，用于对字符串字面量类型进行去空格处理
 */

type TrimLeft<S extends string> = S extends ` ${infer T}` ? TrimLeft<T> : S;
type TrimRight<S extends string> = S extends `${infer T} ` ? TrimRight<T> : S;
type Trim<V extends string> = TrimLeft<TrimRight<V>>;

// 测试用例
type Val = Trim<' semlinker '>;
//=> 'semlinker'

/**
 * 8.实现一个IsEqual工具类型，用于比较两个类型是否相等
 */
type IsEqual<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }>; // true
type E2 = IsEqual<[1], []>; // false

/**
 * 9.实现一个Head工具类型，用于获取数组类型的第一个类型
 */
type Head<T extends Array<any>> = T extends [infer F, ...any[]] ? F : never;
// 测试用例
type H0 = Head<[]>; // never
type H1 = Head<[1]>; // 1
type H2 = Head<[3, 2]>; // 3

/**
 * 10.实现一个Tail工具类型，用于获取数组类型除了第一个类型外，剩余的类型
 *
 */
type Tail<T extends Array<any>> = T extends [any, ...infer P] ? P : never;

// 测试用例
type T0 = Tail<[]>; // never
type T1 = Tail<[1, 2]>; // [2]
type T2 = Tail<[1, 2, 3, 4, 5]>; // [2, 3, 4, 5]
