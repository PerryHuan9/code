export type Fn = () => boolean;

type ReturnType<T extends (any) => any> = T extends (any) => infer R ? R : never;

type ReturnT = ReturnType<Fn>; // boolean

class Foo {
  constructor(arg: number, str: string, bool: boolean) {}
}

type InstanceType<T extends abstract new (...arg: any) => any> = T extends abstract new (...arg: any) => infer R ? R : never;

type InstanceT = InstanceType<typeof Foo>;



type Str = Uppercase<'Abc'>

type Srt1 = Lowercase<'ABc'>
