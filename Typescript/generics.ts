// Generic
type User = {
  name: string;
  age: number;
};

// type Identity = { <Input>(value: Input): Input };
// interface Identity  { <Input>(value: Input): Input };
interface Identity<Input> {
  (value: Input): Input;
}

// Generic in arrow function

const identity = <Type>(value: Type) => value;

// const result = identity<number>(2023);

// Generic in regular function
// function identity<Type>(value: Type) {
//   return value;
// }

// const myIdentity:<Input>(value: Input) => Input = identity
// const myIdentity:<Type>(value: Type) => Type = identity

// const myIdentity: { <Input>(value: Input): Input } = identity;

const myIdentity: Identity<number> = identity;

myIdentity(10);

// const result = identity<User>({
//   name: "Job",
//   age: 23,
// });

// const logIdentity = <Type extends {length:number}>(value: Type) => {
//   console.log(value.length);
//   return value
// }

interface LengthObj {
  length: number;
}
const logIdentity = <Type extends LengthObj>(value: Type) => {
  console.log(value.length);
  return value;
};

logIdentity({
  length: 100,
});

//

// const getValue = <Obj, Key>(obj: Obj, key: Key) => {
//   console.log(obj);
//   console.log(key);
// };

// getValue<{ name: string }, string>(
//   {
//     name: "Job",
//   },
//   "name"
// );

// ---

const getValue = <Obj, Key extends keyof Obj>(obj: Obj, key: Key) => {
  return obj[key];
};

getValue(
  {
    name: "Job",
    age: 20,
  },
  "name"
);

// Default Generic

// interface Box<Type> {
//   value: Type
// }

// const box: Box<string> = {
//   value: 'Job'
// }

//
interface Box<Type = string> {
  value: Type;
}

const box: Box = {
  value: "job",
};

const box2: Box<number> = {
  value: 111,
};
