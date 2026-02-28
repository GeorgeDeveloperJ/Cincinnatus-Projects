const promiseFull = false;

const myPromise = new Promise((res, rej) => {
  setTimeout(() => {
    if (promiseFull) {
      res("Promise resolved!!!");
    } else {
      rej("Rejected promise...");
    }
  }, 3000);
});

myPromise.then((val) => {
  console.log(val);
}).catch((err) => console.error(err));