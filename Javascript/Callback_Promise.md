Bất đồng bộ trong JavaScript chỉ xảy ra khi chúng ta gọi đến một hàm bất đồng bộ, ví dụ như setTimeout, fetch, axios, fs.readFile, fs.writeFile, ...

Còn những đoạn code bình thường như for, if, while, switch, ... thì vẫn chạy tuần tự như bình thường.

> Chúng ta cần phải biết cái nào là bất đồng bộ, cái nào là đồng bộ, để biết được đoạn code nào chạy trước, đoạn code nào chạy sau. Thường những đoạn code bất đồng bộ sẽ có callback, promise, async/await.

# 🥇Callback

## Callback là một hàm được truyền vào một hàm khác như một tham số.

Cái function callback được truyền vào setTimeout là một callback. Nó sẽ được gọi sau 1 giây khi setTimeout được gọi.

```js
function callback() {
  console.log("Hello World");
}
setTimeout(callback, 1000);
```

---

Callback thường được dùng trong xử lý bất đồng bộ, nhưng lưu ý rằng callback vẫn có thể là đồng bộ, không nhất thiết cứ callback là auto nó bất đồng bộ.

Ví dụ cái function callback được truyền vào syncFunction được gọi là một callback. Nó sẽ được gọi ngay lập tức khi syncFunction được gọi.

```js
function callback() {
  console.log("Hello World");
}

function syncFunction(cb) {
  cb();
}

syncFunction(callback);
```

# 🥇Promise

## "Javascript Promises are Eager and Not Lazy"

Trong ngữ cảnh của JavaScript và Promises, "eager" có nghĩa là Promise sẽ được thực thi ngay lập tức khi nó được tạo ra, ngay cả trước khi bạn gọi phương thức then() để xử lý kết quả.

Khi tạo ra một Promise, một công việc bất đồng bộ sẽ được khởi tạo. Promise sẽ bắt đầu thực hiện công việc đó ngay lập tức, ngay cả khi chưa sử dụng phương thức then() để xử lý kết quả. Điều này có nghĩa là Promise sẽ bắt đầu thực thi công việc bất đồng bộ và không chờ đợi cho việc gọi then().

Ví dụ, trong đoạn mã sau:

```js
const promise = new Promise((resolve, reject) => {
  console.log("Executing promise");
  resolve("Success");
});

promise.then((result) => {
  console.log("Promise resolved:", result);
});

console.log("Promise created");
```

###### Đầu tiên, khi tạo một Promise, đoạn mã trong hàm khởi tạo sẽ được thực thi và thông báo "Executing promise" sẽ được log ra. Tiếp theo, "Promise created" sẽ được log ra. Cuối cùng, khi gọi phương thức then() trên Promise, hàm callback trong then() mới được gọi và thông báo "Promise resolved: Success" sẽ được log ra.

> Nếu muốn khi then() thì mới được gọi thì phải chuyển nó thành một function return promise. Như thế này mới gọi là lazy .

Với cách này thì khi chúng ta gọi promiseFunc() thì "Executing promise" mới được log ra. Kết quả đoạn code trên là

```
Executing promise
Promise created
Promise resolved: Success
```

> Có thể thấy nó không khác gì cái code trên đó, nhưng nếu comment cái dòng lệnh promiseFunc().then((result) => {... đi thì sẽ thấy nó không log ra "Executing promise" nữa. Còn cái code trên thì nó vẫn log ra "Executing promise" ngay cả khi chúng ta không gọi promise.then((result) => {....

## Chuyển một callback thành một promise

```js
const getProduct = new Promise((resolve) => {
  // setTimeout sẽ được gọi ngay lập tức
  setTimeout(() => {
    // còn callback trong này sau 1s sẽ chạy
    console.log("setTimeout");
    resolve([]);
  }, 1000);
});
```

<span style="color: deeppink">Promise là 1 biến chứ không phải là function gì cả, biến đây là object. Còn thứ chúng ta hay thấy khi gọi api kiểu như getApi().then() thì khi gọi getApi(), nó return về 1 promise chứ không phải getApi là 1 promise</span>

```js
// Tạo nhanh một promise mà sẽ resolve
const presolve = Promise.resolve(100);
// Tạo nhanh một promise mà sẽ reject
const preject = Promise.reject(new Error("loi"));
```

<span style="color: orange" >Một số function mà return về promise tương đương nhau</span>

```js
// Một async function sẽ return về một promise
// Cho dù giá trị return bên trong function không phải là promise
const handle = async () => {
  return "hello";
};

// Trong trường hợp giá trị return là một promise
// Thì mọi thứ vẫn không thay đổi, vẫn như trên
// Không có chuyện lồng nhau như `handle().then(promise => promise.then(res => {console.log(res)}))`
const handle2 = async () => {
  return Promise.resolve("hello");
};
// Đây cũng là một function return promise tương tự 2 trường hợp trên
// Chỉ khác là nó không khai báo async thôi
const handle3 = () => {
  return Promise.resolve("hello");
};
```
