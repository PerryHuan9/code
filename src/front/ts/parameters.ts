export type Fn = (arg: number, str: string, bool: boolean) => [number, string, boolean];

type Parameters<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;

type Param = Parameters<Fn>;

class Foo {
  constructor(arg: number, str: string, bool: boolean) {}
}

type ConstructorParameters<T extends abstract new (...arg: any) => any> = T extends abstract new (
  ...arg: infer P
) => any
  ? P
  : never;

type ConstructorParam = ConstructorParameters<typeof Foo>;
