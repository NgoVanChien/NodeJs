# 🥇Async/Await

Async await giúp chúng ta loại bỏ được callback trong promise. Nhưng vẫn không thoát khỏi promise, chúng nó kế thừa lẫn nhau thôi.

## Lưu ý quan trọng:

> - Chỉ nên dùng async await cho function mà bên trong có xử lý promise

> - Chỉ await được promise, không await được callback hay mấy cái function thường

> - Async function là function return về promise

#####Tương tự khi dùng promise thì phải thêm .catch(), dùng async await thì phải try catch, không thì khi nó lỗi nó sẽ crash app.

```js
const main = async () => {
  try {
    const data = await p;
    console.log(data);
  } catch (error) {
    console.log(new Error(error));
  }
};
main();
```

- Khi `throw` trong 1 `async function` thì nó sẽ ngay lập tức cho `function` đó return một `promise.reject()`

```js
const main = async () => {
  const data = await p;
  console.log(data);
  throw new Error("Chủ động quăng lỗi");
};
main();
```

- Nếu có `nhiều` `async function` `lồng nhau`, không cần try catch từng async function, mà `chỉ` cần `try catch` `async function` ngoài cùng là được.

Lưu ý: `phải` đảm bảo dùng `await` cho `async function` bên trong thì mới được

```js
const getApi1 = () => {
  return Promise.reject(new Error("Loi API"));
};

const getApi2 = async () => {
  await getApi1();
};

const getApi3 = async () => {
  try {
    await getApi2();
  } catch (error) {
    // xử lý lỗi tại đây
  }
};
```

Tương tự bên promise, một khi đã `try catch` thì function luôn return một `promise.resolve(x)` trừ khi chủ động `throw` hoặc return `Promise.reject(x)`

# 🥇Promise.all

Dùng `promise.all` khi ta muốn chạy `song song nhiều promise`, và khi tất cả các promise đó `đều resolve` thì mới thực hiện tiếp.

Ứng dụng khi ta có nhiều promise `không phụ thuộc kết quả` `của nhau`

Ví dụ dưới đây, promise1, promise2, promise3 không phụ thuộc kết quả của nhau, nên ta có thể dùng `promise.all` để chạy` song song 3 cái promise` này, thay vì đợi từng cái chạy xong rồi mới chạy cái tiếp theo.

```js
const promise1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise 1"), 2000);
  });

const promise2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise 2"), 1000);
  });

const promise3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise 3"), 1500);
  });

Promise.all([promise1(), promise2(), promise3()])
  .then((results) => {
    console.log("Results:", results);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Hoặc dùng async await
const main = async () => {
  try {
    const [result1, result2, result3] = await Promise.all([
      promise1(),
      promise2(),
      promise3(),
    ]);
  } catch (error) {
    console.log("Error:", error);
  }
};
```

> Áp dụng promise.all đúng cách sẽ giúp tối ưu hiệu suất ứng dụng lên nhiều lần.
