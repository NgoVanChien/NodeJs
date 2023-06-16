// function hello() {
//   return "Hello World";
// }
// const hello = () => {
//   return 'Hello World'
// }

// console.log(hello());

// const hello = () => [1, 2].map((item) => item * 2);

// const result = hello();
// console.log(result);

function getName1() {
  console.log(this);
}

const getName2 = () => {
  console.log(this);
};

const user = {
  name: "John",
  getName: getName1,
  getName2: getName2,
};
const car = {
  name: "BMW",
  getName: getName1,
  getName2: getName2,
};
// About This?
// 1.  Trong regular functions
//--> This đại diện đối tượng đã gọi hàm
// ở đây là user, car

// 2 Trong arrow functions
// --> từ khóa This luôn đại diện cho đối tượng đã xác định arrow functions.

// Trong môi trường NodeJs là {} rỗng
// trình duyệt chrome : object window

// user.getName();
// car.getName();
user.getName2();
car.getName2();
