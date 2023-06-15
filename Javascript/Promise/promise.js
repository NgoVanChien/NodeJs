const promise = new Promise((resolve, reject) => {
  console.log("Executing promise");
  resolve("Success");
});

promise.then((result) => {
  console.log("Promise resolved:", result);
});

console.log("Promise created");

const promiseFunc = () =>
  new Promise((resolve, reject) => {
    console.log("Executing promise");
    resolve("Success");
  });

// promiseFunc().then((result) => {
//   console.log("Promise resolved:", result);
// });

console.log("Promise created");

//
const p = Promise.reject(10);

p.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log("error", err);
});

const handle = async () => {
  return "hello";
};

handle().then((res) => {
  console.log(res);
});

//
const handle2 = () => {
  return Promise.resolve(true);
};

// Xử lý promise chain

// Trong .then() chúng ta return cái gì thì nó sẽ là data cho cái then tiếp theo. Cho dù bạn có return về 1 promise trong then thì nó cũng giống return thường

const handle3 = async () => {
  return "hello";
};

handle3()
  .then((res) => {
    // 2 cái return này tương đương nhau
    // return Promise.resolve(res + ' hi')
    return res + " hi";
  })
  .then((res) => {
    console.log(res);
  });
//

// Nếu muốn ở chain tiếp theo không nhảy vào then mà nhảy vào .catch thì cần throw() hoặc return Promise.reject() trong .then() trước đó

const handle4 = async () => {
  return "hello";
};

handle4()
  .then((res) => {
    // return Promise.reject(new Error("error"));
    // Dùng new Error để khi nó log ra nó kèm dấu vết bị lỗi
    // throw new Error('error')
    throw res + " world";
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("err", err);
  });

// ---
const handle0 = async () => {
  return "hello";
};

const handle1 = (value) => {
  return Promise.resolve("handle1 " + value);
};

// ❌ callback hell, không nên dùng
//handle0().then((res) => {
//   handle1(res).then((res) => {
//     console.log(res);
//   });
// return handle1(res);
// });

// ✅ hạn chế được callback hell
handle0()
  .then((res) => {
    return handle1(res);
  })
  .then((v) => {
    console.log(v);
  });

// ---

Promise.reject("hello").catch((err) => {
  console.log(err);
});

console.log("hi");

// 1 promise mà nó reject thì sẽ làm crash ứng dụng. Muốn không bị crash thì phải luôn luôn .catch nó.

// catch mà không không làm gì trong đó (ví dụ không console.log) thì khi nó lỗi không biết lỗi chỗ nào đấy (lỗi vô hình)

// Một khi đã .catch thì cái chain phía sau luôn luôn là promise.resolve, trừ khi throw hoặc return Promise.reject trong .catch

// --------------- //

const handle6 = () => {
  return Promise.resolve(true);
};
handle6()
  .then((res) => {
    throw new Error("error");
  })
  .catch((e) => {
    console.log("Chắc chắn sẽ nhảy vào đây");
    // return Promise.reject(e);
    throw e;
    // return 1;
  })
  .then((v) => {
    console.log(v);
    console.log(
      "Nhảy vào đây vì trước đó đã catch, và giá trị v là undefined vì trong catch không return gì cả"
    );
  })
  .catch((e) => {
    console.log(e);
  });
