// Vòng for 100 lần
for (let i = 0; i < 100; i++) {
  console.log(i);
}
console.log("Done");

function callback1() {
  console.log("Hello World");
}
setTimeout(callback1, 1000);

// callback vẫn có thể là đồng bộ, không nhất thiết cứ callback là auto nó bất đồng bộ.
function callback() {
  console.log("Hello World");
}
function syncFunction(cb) {
  cb();
}
syncFunction(callback);
