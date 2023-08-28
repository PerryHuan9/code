type Keys = 'name' | 'age' | 'sex';

type Keys1 = Exclude<Keys, 'name'>; // age

const k: Keys = 'name';
// const k1:Keys1 = 'name'; //error
