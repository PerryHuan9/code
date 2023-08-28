/**
 * 如何定义一个 SetOptional 工具类型，支持把给定的keys对应的属性变成可选的？
 *
 *
 */

type Foo = {
  a: number;
  b?: string;
  c: boolean;
};

type SetOptional<O, K extends keyof O> = Omit<O, K>;

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;
