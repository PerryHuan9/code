/**
 * 如何定义一个 SetOptional 工具类型，支持把给定的keys对应的属性变成可选的？
 *
 *
 */

export type Foo = {
  a: number;
  b?: string;
  c: boolean;
};

type SetOptional<O, K extends keyof O> = Omit<O, K> & Partial<Pick<O, K>>;

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

const val: SomeOptional = {
  c: true
};


/**
 * 实现一个SetRequired工具类型，支持把给定的keys对应的属性变成必选
 */

type SetRequired<O, K extends keyof O> = Omit<O, K> & Required<Pick<O, K>>;

type ToRequired = SetRequired<Foo, 'b'>;


const val2: ToRequired = {
  a: 12,
  b: '',
  c: false,
}


