// Chỉ nên dùng async await cho function mà bên trong có xử lý promise
// Chỉ await được promise, không await được callback hay mấy cái function thường
// Async function là function return về promise

const p = Promise.resolve("hello");

// Muốn dùng async await cho cái promise trên thì phải tạo 1 function
// Vì async chỉ dùng cho function
// main là 1 function return về promise nhé
const main = async () => {
  const data = await p;
  console.log(data);
  return 1;
};
main().then((res) => {
  console.log(res);
});

//

const p1 = Promise.reject("loi");
const main1 = async () => {
  try {
    const data = await p1;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
main1();

//
// Khi throw trong 1 async function thì nó sẽ ngay lập tức cho function đó return một promise.reject()

const p2 = Promise.resolve("hi");
const main2 = async () => {
  const data = await p2;
  console.log(data);
  throw new Error("Chủ động quăng lỗi");
};
main2()
  .then((res) => {
    console.log("hihi");
  })
  .catch((err) => {
    console.log("loi");
  });

//  ----   Nếu có nhiều async function lồng nhau, không cần try catch từng async function, mà chỉ cần try catch async function ngoài cùng là được.

// const getApi1 = () => {
//   return Promise.reject(new Error("Loi API"));
// };

// const getApi2 = async () => {
//   await getApi1();
// };

// const getApi3 = async () => {
//   try {
//     await getApi2();
//   } catch (error) {
// xử lý lỗi tại đây
//     console.log("loi");
//   }
// };

// getApi3(); // loi

// -- có thể try catch ở getApi2
// const getApi1 = () => {
//   return Promise.reject(new Error("Loi API"));
// };

// const getApi2 = async () => {
//   try {
//     await getApi1();
//   } catch (error) {
// Nếu k throw lỗi ở đây, k xử lý gì cả thì
// await getApi2() k có lồi
//throw error
//   }
// };

// const getApi3 = async () => {
//   try {
//     await getApi2();
//     console.log(123);
//   } catch (error) {
//
//     console.log("loi");
//   }
// };

// getApi3(); // 123

// ---------------------- //

// const getApi1 = () => {
//   return Promise.reject(new Error("Loi API"));
// };
// const getApi2 = async () => {
//   try {
//     await getApi1();
//   } catch (error) {
// k return là mặc định return về undefinned
// return 11;
//   }
// };
// const getApi3 = async () => {
//   try {
//     const data = await getApi2();
//     console.log(data);
//   } catch (error) {
// xử lý lỗi tại đây
//     console.log(error);
//   }
// };
// getApi3(); // undefined

// throw ở getApi2 --> hơi dài , nhưng phải try catch cho đúng
// const getApi1 = () => {
//   return Promise.reject(new Error("Loi API"));
// };
// const getApi2 = async () => {
//   try {
//     await getApi1();
//   } catch (error) {
//     throw error;
//   }
// };
// const getApi3 = async () => {
//   try {
//     const data = await getApi2();
//     console.log(data);
//   } catch (error) {
// xử lý lỗi tại đây
//     console.log("loi");
//   }
// };
// getApi3(); // loi

//  ---- Tương tự bên promise, một khi đã try catch thì function luôn return một promise.resolve(x) trừ khi chủ động throw hoặc return Promise.reject(x) ------
const getApi1 = () => {
  return Promise.reject("LOI ROI ");
};
const getApi2 = async () => {
  try {
    await getApi1();
  } catch (error) {
    // return Promise.resolve(error);
    return Promise.resolve(error);
  }
};
const getApi3 = async () => {
  try {
    const data = await getApi2();
    console.log(data);
  } catch (error) {
    console.log("loi");
  }
};
getApi3(); // LOI ROI

// Dùng promise.all khi ta muốn chạy song song nhiều promise, và khi tất cả các promise đó đều resolve thì mới thực hiện tiếp.

// Ứng dụng khi ta có nhiều promise không phụ thuộc kết quả của nhau

// Ví dụ dưới đây, promise1, promise2, promise3 không phụ thuộc kết quả của nhau, nên ta có thể dùng promise.all để chạy song song 3 cái promise này, thay vì đợi từng cái chạy xong rồi mới chạy cái tiếp theo.
const promise1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise 1"), 2000);
  });

const promise2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise 2"), 1500);
  });

const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise 3"), 1000);
  });

// Promise.all([promise1(), promise2(), promise3()])
//   .then((results) => {
//     console.log("Results:", results);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   });

// Hoặc dùng async await

// const main0 = async () => {
//   try {
//     const result = await Promise.all([promise1(), promise2(), promise3()]);
//     console.log(result);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// };

// main0(); //  Results: [ 'Promise 1', 'Promise 2', 'Promise 3' ]

const main10 = async () => {
  try {
    const [result1, result2, result3] = await Promise.all([
      promise1(),
      promise2(),
      promise3(),
    ]);
    console.log(result1, result2, result3);
  } catch (error) {
    console.log("Error:", error);
  }
};

main10(); // Promise 1 Promise 2 Promise 3
